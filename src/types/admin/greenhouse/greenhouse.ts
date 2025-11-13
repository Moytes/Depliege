export interface AddGreenhouseRequest {
  name: string;
  location: string;
}

export interface PatchGreenhouseRequest {
  name: string;
  location: string;
}

export interface GetGreenhouseDto {
  id: string; 
  name: string;
  location: string;
  ownerId: string; 
}

export interface SensorReadingDto {
  timestamp: string; 
  temperature: number;
  humidity: number;
}