import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { VehiclesService } from './services/vehicle.service';
import { VehicleDTO } from './models/vehicle.model';

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehicleService: VehiclesService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    public getAll() {
        return this.vehicleService.getVehicles();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') index: any) {
        const vehicle = this.vehicleService.getVehiclesById(index)
        return vehicle;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createVehicle(@Body() body: VehicleDTO) {
        const vehicle = this.vehicleService.addVehicle(body);
        return vehicle;
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    editVehicle(@Param('id') index: any, @Body() body: VehicleDTO) {
        const vehicle = this.vehicleService.editVehicle(body, index);
        return vehicle;
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeVehicle(@Param('id') index: any) {
        const request = this.vehicleService.removeVehicle(index);
        return request;
    }
}