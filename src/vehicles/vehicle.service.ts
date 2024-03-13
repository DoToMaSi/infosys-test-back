import { Injectable } from '@nestjs/common';
import { VehicleDTO } from './models/vehicle.model';

@Injectable()
export class VehiclesService {
    private readonly vehicles: VehicleDTO[] = [];

    // For testing purposes
    setVehicles(vehicles: VehicleDTO[]) {
        vehicles.forEach((vehicle) => {
            this.vehicles.push(vehicle);
        });
    }

    getVehicles() {
        return this.vehicles;
    }

    getVehiclesById(index: number) {
        return this.vehicles[index];
    }

    addVehicle(vehicle: VehicleDTO) {
        vehicle.createdOn = new Date().toISOString();
        vehicle.lastUpdated = new Date().toISOString();
        this.vehicles.push(vehicle);
        this.reviewIndexes();

        return vehicle;
    }

    editVehicle(vehicle: VehicleDTO, index: number) {
        vehicle.lastUpdated = new Date().toISOString();
        this.vehicles[index] = vehicle;
        this.reviewIndexes();

        return vehicle;
    }

    removeVehicle(index: number) {
        this.vehicles.splice(index, 1);
        this.reviewIndexes();

        return true;
    }

    reviewIndexes() {
        if (this.vehicles.length > 0) {
            this.vehicles.map((vehicle, index) => {
                vehicle.index = index;
            })
        }
    }
}