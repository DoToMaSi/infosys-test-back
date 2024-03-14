import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { VehiclesService } from './services/vehicle.service';
import { VehicleDTO } from './models/vehicle.model';

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehicleService: VehiclesService) { }

    @Get()
    public getAll(@Res({ passthrough: true }) response: Response) {
        response.status(200)
        return this.vehicleService.getVehicles();
    }

    @Get(':id')
    getById(@Param('id') index: any, @Res() response: Response) {
        const vehicle = this.vehicleService.getVehiclesById(index)
        response.status(200)
        return vehicle;
    }

    @Post()
    createVehicle(@Body() body: VehicleDTO, @Res() response: Response) {
        this.vehicleService.addVehicle(body);
        response.status(201)
        return body;
    }

    @Put(':id')
    editVehicle(@Param('id') index: any, @Body() body: VehicleDTO, @Res() response: Response) {
        this.vehicleService.editVehicle(body, index);
        response.status(200)
        return body;
    }

    @Delete(':id')
    removeVehicle(@Param('id') index: any, @Res() response: Response) {
        this.vehicleService.removeVehicle(index);
        response.status(204)
        return {};
    }
}