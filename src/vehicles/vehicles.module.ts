import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './services/vehicle.service';

export const vehicleDependencies = {
    controllers: [VehiclesController],
    providers: [VehiclesService]
}

@Module(vehicleDependencies)

export class VehiclesModule { }