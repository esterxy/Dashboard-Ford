
export interface Vehicle {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}


export interface VehiclesResponse {
  vehicles: Vehicle[];
}


export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: 'on' | 'off';
  lat: number;
  long: number;
}


export interface VehicleDataRequest {
  vin: string;
}


export interface User {
  id: number;
  nome: string;
  email: string;
}


export interface LoginRequest {
  nome: string;
  senha: string;
}


export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
}


export const AVAILABLE_VINS = [
  '2FRHDUYS2Y63NHD22454',
  '2RFAASDY54E4HDU34874',
  '2FRHDUYS2Y63NHD22455',
  '2RFAASDY54E4HDU34875',
  '2FRHDUYS2Y63NHD22654',
  '2FRHDUYS2Y63NHD22854'
] as const;

export type VIN = typeof AVAILABLE_VINS[number];