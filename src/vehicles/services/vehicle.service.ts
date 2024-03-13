import { Injectable } from '@nestjs/common';
import { VehicleDTO } from '../models/vehicle.model';

@Injectable()
export class VehiclesService {
    private readonly vehicles: VehicleDTO[] = [];

    getVehicles() {
        return this.vehicles;
    }

    getVehiclesById(index: number) {
        return this.vehicles[index];
    }

    async addVehicle(vehicle: VehicleDTO) {
        this.vehicles.push(vehicle);
    }

    editVehicle(vehicle: VehicleDTO, index: number) {
        this.vehicles[index] = vehicle;
    }

    removeVehicle(index: number) {
        this.vehicles.splice(index, 1);
    }
}