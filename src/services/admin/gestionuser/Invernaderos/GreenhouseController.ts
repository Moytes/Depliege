import axios from 'axios';
import { AddGreenhouseRequest, PatchGreenhouseRequest, GetGreenhouseDto, SensorReadingDto } from '../../../../types/admin/greenhouse/greenhouse';

// 1. Usar REACT_APP_API_URL del entorno.
const API_BASE_URL = process.env.REACT_APP_API_URL;

// 2. Definir la URL base específica para este servicio, combinando la URL base y la ruta del controlador.
const GREENHOUSE_BASE_URL = `${API_BASE_URL}/api/Greenhouse`;

// Función de utilidad para verificar que la URL base sea válida (como en el servicio de login)
const isValidHttpUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
};

// 3. Crear la instancia de axios con la URL base completa
const apiClient = axios.create({
    baseURL: GREENHOUSE_BASE_URL
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 4. Implementar la verificación de URL antes de hacer peticiones (opcional, pero buena práctica)
const checkBaseUrl = () => {
    if (!isValidHttpUrl(API_BASE_URL)) {
        console.error("GreenhouseService: Error FATAL: La URL base no es válida o no está configurada.");
        console.error("GreenhouseService: El valor de API_BASE_URL es:", API_BASE_URL);
        throw new Error("Error de configuración: La URL del servidor no es válida.");
    }
}

const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
       const apiError = error.response.data;
       if (apiError && (apiError.errorMessage || apiError.message)) {
           throw new Error(apiError.errorMessage || apiError.message);
       }
     throw error.response.data;
    }
    throw new Error('Ocurrió un error inesperado en la solicitud.');
};


export const getGreenhousesByUser = async (): Promise<GetGreenhouseDto[]> => {
    try {
        checkBaseUrl(); // Verifica antes de la llamada
        const response = await apiClient.get<GetGreenhouseDto[]>('/GetGreenhousesByUser');
        return response.data;
    } catch (error) {
        handleError(error);
        return []; 
    }
};


export const addGreenhouse = async (greenhouseData: AddGreenhouseRequest): Promise<{ greenhouseId: string }> => {
    try {
        checkBaseUrl(); // Verifica antes de la llamada
        const response = await apiClient.post<{ greenhouseId: string }>('/AddGreenhouse', greenhouseData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error; 
    }
};


export const patchGreenhouse = async (id: string, greenhouseData: PatchGreenhouseRequest): Promise<any> => {
    try {
        checkBaseUrl(); // Verifica antes de la llamada
        const response = await apiClient.patch(`/PatchGreenhouse/${id}`, greenhouseData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};


export const deleteGreenhouse = async (id: string): Promise<any> => {
    try {
        checkBaseUrl(); // Verifica antes de la llamada
        const response = await apiClient.delete(`/DeleteGreenhouse/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getColdDataByGreenhouseId = async (id: string): Promise<SensorReadingDto[]> => {
    try {
        checkBaseUrl(); // Verifica antes de la llamada
        const response = await apiClient.get<SensorReadingDto[]>(`/GetColdDataByGreenhouseId/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        return [];
    }
};

export const getHotDataByGreenhouseId = async (id: string): Promise<SensorReadingDto[]> => {
    try {
        checkBaseUrl(); // Verifica antes de la llamada
        const response = await apiClient.get<SensorReadingDto[]>(`/GetHotDataByGreenhouseId/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        return [];
    }
};