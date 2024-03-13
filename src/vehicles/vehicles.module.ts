import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './services/vehicle.service';

@Module({
    controllers: [VehiclesController],
    providers: [VehiclesService]
})

export class VehiclesModule { }