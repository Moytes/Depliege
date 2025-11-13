import { useState, useEffect } from 'react';
import { Form, App } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

import { loginUser, saveToken } from '../../../services/auth/login/authService';
import { LoginUserData } from '../../../types/auth/login/auth';

const MAX_LOGIN_ATTEMPTS = 4;
const BLOCK_DURATION_MINUTES = 2;

export const useLoginForm = () => {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [blockEndTime, setBlockEndTime] = useState<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isBlocked && blockEndTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const remaining = blockEndTime - now;

                if (remaining <= 0) {
                    clearInterval(interval);
                    setIsBlocked(false);
                    setLoginAttempts(0);
                    setTimeLeft(null);
                    setBlockEndTime(null);
                    message.info('El formulario ha sido desbloqueado. Puede intentar iniciar sesión de nuevo.');
                } else {
                    const minutes = Math.floor((remaining / 1000) / 60);
                    const seconds = Math.floor((remaining / 1000) % 60);
                    setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isBlocked, blockEndTime, message]);

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            const hashedPassword = SHA256(values.password).toString();
            const userData: LoginUserData = {
                Mail: values.email, 
                Password: hashedPassword, 
            };

            const response = await loginUser(userData);
            saveToken(response.jwttoken);

            const userRole = response.role; 
            const userVerified = response.verified; 

            setLoginAttempts(0); 
            message.success('¡Inicio de sesión exitoso!');

            if (userRole === 1) {
                navigate('/admin');
            } 
            else if (userRole === 2) {
                
                if (userVerified === 2) {
                    navigate('/activar-cuenta');
                } else {
                    navigate('/user');
                }
            } 
            else {
                message.warning('Rol de usuario no reconocido. Redirigiendo a la página principal.');
                navigate('/');
            }

        } catch (error) {
            console.error("Fallo en el inicio de sesión:", error);
            const newAttemptCount = loginAttempts + 1;
            setLoginAttempts(newAttemptCount);

            if (newAttemptCount >= MAX_LOGIN_ATTEMPTS) {
                const endTime = Date.now() + BLOCK_DURATION_MINUTES * 60 * 1000;
                setBlockEndTime(endTime);
                setIsBlocked(true);
                message.error(`Demasiados intentos fallidos. El formulario se ha bloqueado por ${BLOCK_DURATION_MINUTES} minutos.`);
            } else {
                let errorMessage = `Usuario o contraseña incorrectos. Intento ${newAttemptCount} de ${MAX_LOGIN_ATTEMPTS}.`;
                
                if (axios.isAxiosError(error) && error.response?.data?.errorMessage) {
                    errorMessage = `${error.response.data.errorMessage} (Intento ${newAttemptCount} de ${MAX_LOGIN_ATTEMPTS}).`;
                }
                
                message.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        isBlocked,
        timeLeft,
        onFinish
    };
};