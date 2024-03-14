import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller'
import { vehicleDependencies } from './vehicles.module';
import { VehiclesService } from './services/vehicle.service';
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
            const spy = jest.spyOn(vehicleService, 'getVehicles').mockImplementation(() => payload);

            expect(vehiclesController.getAll().length).toEqual(0);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should return an array with two cars', () => {
            const payload: VehicleDTO[] = CARS;
            const spy = jest.spyOn(vehicleService, 'getVehicles').mockImplementation(() => payload);

            expect(vehiclesController.getAll()).toBe(payload);
            expect(vehiclesController.getAll().length).toEqual(2);
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });

    describe('getById', () => {
        it('should NOT return an vehicle', () => {
            const index = 0;
            const spy = jest.spyOn(vehicleService, 'getVehiclesById').mockImplementation(() => undefined);

            expect(vehiclesController.getById(index)).toBe(undefined);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should return an vehicle', () => {
            const index = 0;
            const spy = jest.spyOn(vehicleService, 'getVehiclesById').mockImplementation(() => CARS[0]);

            expect(vehiclesController.getById(index)).toHaveProperty('brand');
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should return the second vehicle', () => {
            const index = 1;
            const spy = jest.spyOn(vehicleService, 'getVehiclesById').mockImplementation(() => CARS[index]);

            expect(vehiclesController.getById(index)).toBe(CARS[index]);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('createVehicle', () => {
        it('should create a vehicle', () => {
            const carMock = CARS[0];
            const spy = jest.spyOn(vehicleService, 'addVehicle').mockImplementation(() => CARS[0]);

            expect(vehiclesController.createVehicle(carMock)).toBe(carMock);
            expect(spy).toHaveBeenCalledTimes(1);
        })
    })

    describe('editVehicle', () => {
        it('should edit a vehicle', () => {
            const carMock = CARS[0];
            const index = 0;
            const spy = jest.spyOn(vehicleService, 'editVehicle').mockImplementation(() => CARS[0]);

            expect(vehiclesController.editVehicle(index, carMock)).toBe(carMock);
            expect(spy).toHaveBeenCalledTimes(1);
        })
    });

    describe('removeVehicle', () => {
        it('should remove a vehicle', () => {
            const index = 0;
            const spy = jest.spyOn(vehicleService, 'removeVehicle').mockImplementation(() => true);

            expect(vehiclesController.removeVehicle(index)).toStrictEqual(true);
            expect(spy).toHaveBeenCalledTimes(1);
        })
    });
})