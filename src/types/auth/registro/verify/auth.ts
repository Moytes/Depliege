// 📍 Archivo: src/types/auth/registro/verify/auth.ts
export interface VerifyAccountData {
    userId: string;
    verificationCode: string;
}

export interface ResendCodeData {
    userId: string;
}