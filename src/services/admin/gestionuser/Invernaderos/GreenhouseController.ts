import axios from 'axios';
import { 
  AddGreenhouseRequest, 
  PatchGreenhouseRequest, 
  GetGreenhouseDto, 
  SensorReadingDto 
} from '../../../../types/admin/greenhouse/greenhouse';


const API_BASE_URL = 'https://api-scci.happyglacier-792390d3.westus2.azurecontainerapps.io/api/Greenhouse'; 

const apiClient = axios.create({
    baseURL: API_BASE_URL
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
    const response = await apiClient.get<GetGreenhouseDto[]>('/GetGreenhousesByUser');
    return response.data;
  } catch (error) {
    handleError(error);
    return []; // Retorno para satisfacer el tipo en caso de error
  }
};


export const addGreenhouse = async (greenhouseData: AddGreenhouseRequest): Promise<{ greenhouseId: string }> => {
  try {
    const response = await apiClient.post<{ greenhouseId: string }>('/AddGreenhouse', greenhouseData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error; 
  }
};


export const patchGreenhouse = async (id: string, greenhouseData: PatchGreenhouseRequest): Promise<any> => {
  try {
    const response = await apiClient.patch(`/PatchGreenhouse/${id}`, greenhouseData);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};


export const deleteGreenhouse = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.delete(`/DeleteGreenhouse/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getColdDataByGreenhouseId = async (id: string): Promise<SensorReadingDto[]> => {
  try {
    const response = await apiClient.get<SensorReadingDto[]>(`/GetColdDataByGreenhouseId/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const getHotDataByGreenhouseId = async (id: string): Promise<SensorReadingDto[]> => {
  try {
    const response = await apiClient.get<SensorReadingDto[]>(`/GetHotDataByGreenhouseId/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};