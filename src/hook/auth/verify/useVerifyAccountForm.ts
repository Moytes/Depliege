import { useState } from 'react';
import { Form, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
// Importa las *funciones* del servicio
import { verifyUserAccount, resendVerificationCode } from '../../../services/auth/registro/authService';
// Importa los *tipos* de verificación (según tu 'ls')
import { VerifyAccountData, ResendCodeData } from '../../../types/auth/registro/verify/auth';

// Exporta el hook que la vista está buscando
export const useVerifyAccountForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const onFinish = async (values: any) => {
        if (!userId) {
            message.error("Error: No se encontró el ID de usuario.");
            return;
        }

        setLoading(true);
        try {
            const data: VerifyAccountData = {
                userId: userId,
                verificationCode: values.verificationCode
            };

            const response = await verifyUserAccount(data);
            message.success(response.message || '¡Cuenta verificada con éxito! Ya puedes iniciar sesión.');
            
            // Redirigir a la vista de login (que está en '/')
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
            return { success: false, message: "Error: No se encontró el ID de usuario." };
        }

        try {
            const data: ResendCodeData = { userId };
            const response = await resendVerificationCode(data);
            return { success: true, message: response.message || 'Código reenviado con éxito.' };

        } catch (error: any) {
            console.error('Error al reenviar código:', error);
            return { success: false, message: error.errorMessage || 'No se pudo reenviar el código.' };
        }
    };

    return {
        form,
        loading,
        onFinish,
        onResendCode,
    };
};