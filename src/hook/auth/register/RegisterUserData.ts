import { useState } from 'react';
import { Form, message } from 'antd';
import { SHA256 } from 'crypto-js';
import { registerUser } from '../../../services/auth/registro/authService';
import { RegisterUserData } from '../../../types/auth/registro/auth';
import { useNavigate } from 'react-router-dom'; 

export const useRegisterForm = () => { 
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const onFinish = async (values: any) => {
        setLoading(true);
        form.setFields([
            { name: 'email', errors: [] },
            { name: 'name', errors: [] }
        ]);

        try {
            const trimmedName = values.name.trim();
            const trimmedEmail = values.email.trim();
            const hashedPassword = SHA256(values.password).toString();

            const userData: RegisterUserData = {
                UserName: trimmedName,
                Mail: trimmedEmail,
                Password: hashedPassword,
            };

            await registerUser(userData);
            
            message.success('¡Registro completado! Por favor, inicia sesión y verifica tu cuenta.');
            form.resetFields();
            navigate('/');

        } catch (error: any) {
            console.error('Error en el registro:', error);

            if (error && error.error === 'RepeatedMail') {
                form.setFields([
                    {
                        name: 'email',
                        errors: [error.errorMessage || 'Este correo ya se encuentra registrado.'],
                    },
                ]);
            } else if (error && error.error === 'RepeatedUserName') {
                form.setFields([
                    {
                        name: 'name',
                        errors: [error.errorMessage || 'Este nombre de usuario ya está en uso.'],
                    },
                ]);
            } else {
                let errorMessage = 'No se pudo completar el registro.';
                if (error && error.errorMessage) {
                    errorMessage = error.errorMessage;
                } else if (Array.isArray(error) && error.length > 0) {
                    errorMessage = error[0].errorMessage || errorMessage;
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
        onFinish,
    };
};