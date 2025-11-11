import axios from 'axios';
import { 
  AddGreenhouseRequest, 
  PatchGreenhouseRequest, 
  GetGreenhouseDto, 
  SensorReadingDto 
} from '../../../../types/admin/greenhouse/greenhouse';

// 1. Usar la URL base RELATIVA para el proxy, como en tu LoginView.
// const API_BASE_URL = '/api/Greenhouse'; // <- ESTA LÍNEA ES INCORRECTA O EL PROXY NO ESTÁ CONFIGURADO
const API_BASE_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io/api/Greenhouse'; // <- USAMOS LA URL ABSOLUTA QUE PROPORCIONASTE

// 2. Crear una instancia de Axios
const apiClient = axios.create({
    baseURL: API_BASE_URL
});

// 3. ¡IMPORTANTE! Añadir el interceptor para el token.
//    Esto usa el 'authToken' que tu LoginView guarda.
apiClient.interceptors.request.use(
    (config) => {
        // Obtenemos el token del localStorage
        const token = localStorage.getItem('authToken');
        
        // Si el token existe, lo añadimos a la cabecera 'Authorization'
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Manejamos errores en la configuración de la petición
        return Promise.reject(error);
    }
);

/**
 * Manejador de errores de Axios, similar a tu ejemplo
 */
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
     // Mejoramos el error para devolver el mensaje del backend si existe
     const apiError = error.response.data;
     if (apiError && (apiError.errorMessage || apiError.message)) {
         throw new Error(apiError.errorMessage || apiError.message);
     }
    throw error.response.data;
  }
  throw new Error('Ocurrió un error inesperado en la solicitud.');
};

/**
 * Endpoint: GET /GetGreenhousesByUser
 * Obtiene todos los invernaderos del usuario autenticado.
 */
export const getGreenhousesByUser = async (): Promise<GetGreenhouseDto[]> => {
  try {
    // 4. Usar 'apiClient' y URL relativa
    const response = await apiClient.get<GetGreenhouseDto[]>('/GetGreenhousesByUser');
    return response.data;
  } catch (error) {
    handleError(error);
    return []; // Retorno para satisfacer el tipo en caso de error
  }
};

/**
 * Endpoint: POST /AddGreenhouse
 * Añade un nuevo invernadero.
 */
export const addGreenhouse = async (greenhouseData: AddGreenhouseRequest): Promise<{ greenhouseId: string }> => {
  try {
    // 4. Usar 'apiClient' y URL relativa
    const response = await apiClient.post<{ greenhouseId: string }>('/AddGreenhouse', greenhouseData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; // Re-lanzamos para que el componente maneje el fallo
  }
};

/**
 * Endpoint: PATCH /PatchGreenhouse/{Id}
 * Actualiza un invernadero existente.
 */
export const patchGreenhouse = async (id: string, greenhouseData: PatchGreenhouseRequest): Promise<any> => {
  try {
    // 4. Usar 'apiClient' y URL relativa
    const response = await apiClient.patch(`/PatchGreenhouse/${id}`, greenhouseData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

/**
 * Endpoint: DELETE /DeleteGreenhouse/{Id}
 * Elimina un invernadero.
 */
export const deleteGreenhouse = async (id: string): Promise<any> => {
  try {
    // 4. Usar 'apiClient' y URL relativa
    const response = await apiClient.delete(`/DeleteGreenhouse/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

/**
 * Endpoint: GET /GetColdDataByGreenhouseId/{Id}
 * Obtiene los datos fríos de un invernadero.
 */
export const getColdDataByGreenhouseId = async (id: string): Promise<SensorReadingDto[]> => {
  try {
    // 4. Usar 'apiClient' y URL relativa
    const response = await apiClient.get<SensorReadingDto[]>(`/GetColdDataByGreenhouseId/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

/**
 * Endpoint: GET /GetHotDataByGreenhouseId/{Id}
 * Obtiene los datos calientes de un invernadero.
 */
export const getHotDataByGreenhouseId = async (id: string): Promise<SensorReadingDto[]> => {
  try {
    // 4. Usar 'apiClient' y URL relativa
    const response = await apiClient.get<SensorReadingDto[]>(`/GetHotDataByGreenhouseId/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};