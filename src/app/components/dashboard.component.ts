import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../app/services/vehicle.service';
import { Vehicle, VehicleData, AVAILABLE_VINS } from '../../app/models/vehicle.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  modelSearchControl = new FormControl('');
  vinSearchControl = new FormControl('');

  selectedVehicle: Vehicle | null = null;
  availableModels: string[] = [];
  filteredModels$: Observable<string[]> | undefined;

  vehicleData: VehicleData | null = null;
  availableVINs = [...AVAILABLE_VINS];

  isSearching: boolean = false;
  searchError: boolean = false;
  searchErrorMessage: string = '';

  private destroy$ = new Subject<void>();

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadAvailableModels();
    this.setupModelSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAvailableModels(): void {
    this.vehicleService.getAvailableModels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (models) => {
          this.availableModels = models;
          console.log('Modelos carregados:', models);
        },
        error: (error) => {
          console.error('Erro ao carregar modelos:', error);
        }
      });
  }

  setupModelSearch(): void {
    this.filteredModels$ = this.modelSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(value => this._filterModels(value || ''))
    );
  }

  private _filterModels(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableModels.filter(model => 
      model.toLowerCase().includes(filterValue)
    );
  }

  onModelSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedModel = event.option.value;
    this.loadVehicleByModel(selectedModel);
  }

  loadVehicleByModel(model: string): void {
    this.vehicleService.getVehicleByName(model)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (vehicle) => {
          this.selectedVehicle = vehicle || null;
          if (!vehicle) {
            console.warn('Veículo não encontrado:', model);
          } else {
            console.log('Veículo selecionado:', vehicle);
          }
        },
        error: (error) => {
          console.error('Erro ao carregar veículo:', error);
        }
      });
  }

  clearModelSearch(): void {
    this.modelSearchControl.setValue('');
    this.selectedVehicle = null;
  }

  searchByVIN(): void {
    const vin = this.vinSearchControl.value?.trim();
    
    if (!vin) {
      return;
    }

    this.isSearching = true;
    this.searchError = false;
    this.vehicleData = null;

    this.vehicleService.getVehicleDataByVIN(vin)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.isSearching = false;
          if (data) {
            this.vehicleData = data;
            console.log('Dados do veículo:', data);
          } else {
            this.searchError = true;
            this.searchErrorMessage = 'Código VIN não encontrado!';
          }
        },
        error: (error) => {
          this.isSearching = false;
          this.searchError = true;
          this.searchErrorMessage = error.error?.message || 'Erro ao buscar dados do veículo';
          console.error('Erro na busca por VIN:', error);
        }
      });
  }

  clearVINSearch(): void {
    this.vinSearchControl.setValue('');
    this.vehicleData = null;
    this.searchError = false;
  }

  useVIN(vin: string): void {
    this.vinSearchControl.setValue(vin);
    this.searchByVIN();
  }

  formatStatus(status: 'on' | 'off'): string {
    return this.vehicleService.formatStatus(status);
  }

  getStatusClass(status: 'on' | 'off'): string {
    return this.vehicleService.getStatusClass(status);
  }

  onImageError(event: any): void {
    console.warn('Erro ao carregar imagem:', event);
    event.target.src = 'assets/img/placeholder.png';
  }
}