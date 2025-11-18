import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { 
  Vehicle, 
  VehiclesResponse, 
  VehicleData, 
  VehicleDataRequest 
} from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<VehiclesResponse>(`${this.apiUrl}/vehicles`).pipe(
      map(response => response.vehicles),
      catchError(error => {
        console.error('Erro ao buscar veículos:', error);
        return of([]);
      })
    );
  }

  getVehicleByName(vehicleName: string): Observable<Vehicle | undefined> {
    return this.getVehicles().pipe(
      map(vehicles => vehicles.find(v => 
        v.vehicle.toLowerCase() === vehicleName.toLowerCase()
      ))
    );
  }

  getVehicleDataByVIN(vin: string): Observable<VehicleData | null> {
    const body: VehicleDataRequest = { vin };
    
    return this.http.post<VehicleData>(`${this.apiUrl}/vehicleData`, body).pipe(
      catchError(error => {
        console.error('Erro ao buscar dados do veículo:', error);
        return of(null);
      })
    );
  }

  getAvailableModels(): Observable<string[]> {
    return this.getVehicles().pipe(
      map(vehicles => vehicles.map(v => v.vehicle))
    );
  }

  formatStatus(status: 'on' | 'off'): string {
    return status === 'on' ? 'Ligado' : 'Desligado';
  }

  getStatusClass(status: 'on' | 'off'): string {
    return status === 'on' ? 'status-active' : 'status-inactive';
  }
}