import { useState } from 'react';
import { Form, message } from 'antd';
import { SHA256 } from 'crypto-js';
import { registerUser } from '../../../services/auth/registro/authService';
import { RegisterUserData } from '../../../types/auth/registro/auth';

interface UseRegisterFormProps {
    onBackToLogin: () => void;
}

export const useRegisterForm = ({ onBackToLogin }: UseRegisterFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        form.setFields([{ name: 'email', errors: [] }]);

        try {
            const trimmedName = values.name.trim();
            const trimmedEmail = values.email.trim();
            const hashedPassword = SHA256(values.password).toString();

            const userData: RegisterUserData = {
                UserName: trimmedName,
                Mail: trimmedEmail,
                Password: hashedPassword,
            };

            const response = await registerUser(userData);
            message.success(response.message || '¡Usuario registrado con éxito!');
            form.resetFields();
            onBackToLogin();

        } catch (error: any) {
            console.error('Objeto de error completo:', error);
            if (error && error.error === 'RepeatedMail') {
                form.setFields([
                    {
                        name: 'email', 
                        errors: [error.errorMessage || 'Este correo ya se encuentra registrado.'], 
                    },
                ]);
            } else {
                let errorMessage = 'No se pudo completar el registro.';
                if (error && error.errorMessage) {
                    errorMessage = error.errorMessage;
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