// Basado en los endpoints AddGreenhouse y PatchGreenhouse
export interface AddGreenhouseRequest {
  name: string;
  location: string;
}

export interface PatchGreenhouseRequest {
  name: string;
  location: string;
}

// Basado en el endpoint GetGreenhousesByUser (DTO)
export interface GetGreenhouseDto {
  id: string; // Asumimos que el DTO devuelve un Id
  name: string;
  location: string;
  ownerId: string; // El backend parece verificar esto
  // Agrega aquí cualquier otro campo que devuelva tu DTO
}

// Basado en los endpoints GetColdData y GetHotData
// Asumimos una estructura genérica para las lecturas
export interface SensorReadingDto {
  timestamp: string; // O Date
  temperature: number;
  humidity: number;
  // Agrega cualquier otro dato del sensor
}