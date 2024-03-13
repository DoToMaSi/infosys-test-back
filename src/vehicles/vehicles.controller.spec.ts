import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller'
import { vehicleDependencies } from './vehicles.module';
import { VehiclesService } from './vehicle.service';
import { response } from 'express';
import { VehicleDTO } from './models/vehicle.model';
import { CARS } from './mocks/vehicles.mock';

describe('VehiclesController', () => {
    let vehiclesController: VehiclesController;
    let vehicleService: VehiclesService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule(vehicleDependencies).compile();
        vehiclesController = app.get<VehiclesController>(VehiclesController);
        vehicleService = await app.resolve(VehiclesService);
    });

    it('should be defined', () => {
        expect(vehiclesController).toBeDefined();
        expect(vehicleService).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an empty array', () => {
            const payload = [];
            const res = response;

            jest.spyOn(vehicleService, 'getVehicles').mockImplementation(() => payload);

            expect(vehiclesController.getAll(res).length).toEqual(0);
        });

        it('should return an array with two cars', () => {
            const payload: VehicleDTO[] = CARS;
            const res = response;

            jest.spyOn(vehicleService, 'getVehicles').mockImplementation(() => payload);

            expect(vehiclesController.getAll(res)).toBe(payload);
            expect(vehiclesController.getAll(res).length).toEqual(2);
        });
    });

    describe('getById', () => {
        it('should NOT return an vehicle', () => {
            const index = 0;
            const res = response;

            jest.spyOn(vehicleService, 'getVehiclesById').mockImplementation(() => undefined);

            expect(vehiclesController.getById(index, res)).toBe(undefined);
        });

        it('should return an vehicle', () => {
            const index = 0;
            const res = response;

            jest.spyOn(vehicleService, 'getVehiclesById').mockImplementation(() => CARS[0]);

            expect(vehiclesController.getById(index, res)).toHaveProperty('brand');
        });

        it('should return the second vehicle', () => {
            const index = 1;
            const res = response;

            jest.spyOn(vehicleService, 'getVehiclesById').mockImplementation(() => CARS[index]);

            expect(vehiclesController.getById(index, res)).toBe(CARS[index]);
        });
    });

    describe('createVehicle', () => {
        it('should create a vehicle', () => {
            const carMock = CARS[0];
            const res = response;

            const spy = jest.spyOn(vehicleService, 'addVehicle').mockImplementation(() => CARS[0]);

            expect(vehiclesController.createVehicle(carMock, res)).toBe(carMock);
            expect(spy).toHaveBeenCalledTimes(1);
        })
    })

    describe('editVehicle', () => {
        it('should edit a vehicle', () => {
            const carMock = CARS[0];
            const res = response;
            const index = 0;
            const spy = jest.spyOn(vehicleService, 'editVehicle').mockImplementation(() => CARS[0]);

            expect(vehiclesController.editVehicle(index, carMock, res)).toBe(carMock);
            expect(spy).toHaveBeenCalledTimes(1);
        })
    });

    describe('removeVehicle', () => {
        it('should remove a vehicle', () => {
            const res = response;
            const index = 0;
            const spy = jest.spyOn(vehicleService, 'removeVehicle').mockImplementation(() => true);

            expect(vehiclesController.removeVehicle(index, res)).toStrictEqual({});
            expect(spy).toHaveBeenCalledTimes(1);
        })
    });
})