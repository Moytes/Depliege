import { useState, useEffect } from 'react';
import { Form, App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { verifyUserAccount, resendVerificationCode } from '../../../services/auth/verify/verifyService';
import { VerifyAccountData, ResendCodeData } from '../../../types/auth/registro/verify/auth';
import { decodeToken } from '../../../services/auth/login/authService';
import { DecodedToken } from '../../../types/auth/login/auth';

export const useVerifyAccountForm = () => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false); 
    const [userId, setUserId] = useState<string | null>(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded: DecodedToken | null = decodeToken(token);
            if (decoded && decoded.sub) {
                setUserId(decoded.sub);
            } else {
                message.error("Error: Token inválido. Por favor, inicie sesión de nuevo.");
                navigate('/'); 
            }
        } else {
            message.error("Error: No está autenticado. Por favor, inicie sesión.");
            navigate('/'); 
        }
    }, [navigate, message]); 

    const onFinish = async (values: any) => {
        if (!userId) {
            message.error("Error: No se pudo identificar al usuario desde el token.");
            return;
        }

        setLoading(true);
        try {
            const data: VerifyAccountData = {
                userId: userId,
                VerificationCode: values.verificationCode // Corregido de camelCase
            };

            const response = await verifyUserAccount(data);
            message.success(response.message || '¡Cuenta verificada con éxito!');
            localStorage.removeItem('authToken');
            navigate('/'); 

        } catch (error: any) {
            console.error('Error en la verificación:', error);
            let errorMessage = 'No se pudo verificar la cuenta.';
            if (error && error.error === 'VerificationFailed') {
                errorMessage = error.errorMessage || 'El código ingresado es incorrecto.';
            } else if (error && error.errorMessage) {
                errorMessage = error.errorMessage;
            }
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const onResendCode = async () => {
        if (!userId) {
            message.error("Error: No se pudo identificar al usuario.");
            return;
        }

        setResendLoading(true);
        try {
            const data: ResendCodeData = { userId };
            const response = await resendVerificationCode(data);
            message.success(response.message || 'Código reenviado con éxito.');
        } catch (error: any) {
            console.error('Error al reenviar código:', error);
            message.error(error.errorMessage || 'No se pudo reenviar el código.');
        } finally {
            setResendLoading(false);
        }
    };

    return {
        form,
        loading,
        resendLoading, 
        onFinish,
        onResendCode,
    };
};