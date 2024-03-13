import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { VehiclesService } from './vehicle.service';
import { VehicleDTO } from './models/vehicle.model';

@Controller('vehicles')
export class VehiclesController {

    constructor(private readonly vehicleService: VehiclesService) { }

    @Get()
    getAll(@Res() response: Response) {
        try {
            return response.status(200).send(this.vehicleService.getVehicles());
        } catch (error) {
            return response.status(500).send(error);
        }
    }

    @Post()
    createVehicle(@Body() body: VehicleDTO, @Res() response: Response) {
        try {
            this.vehicleService.addVehicle(body);
            return response.status(200).send(body);
        } catch (error) {
            return response.status(500).send(error);
        }
    }

    @Put(':id')
    editVehicle(@Param('id') index: any, @Body() body: VehicleDTO, @Req() request: Request, @Res() response: Response) {
        try {
            this.vehicleService.editVehicle(body, index);
            return response.status(200).send(body);
        } catch (error) {
            return response.status(500).send(error);
        }
    }

    @Delete(':id')
    removeVehicle(@Param('id') index: any, @Req() request: Request, @Res() response: Response) {
        Logger.log(index);
        try {
            this.vehicleService.removeVehicle(index);
            return response.status(204).send();
        } catch (error) {
            return response.status(500).send(error);
        }
    }
}