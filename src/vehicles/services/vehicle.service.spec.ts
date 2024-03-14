import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicle.service';
import { CARS, CAR_MOCK } from '../mocks/vehicles.mock';

describe('VehiclesService', () => {
    let vehicleService: VehiclesService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                VehiclesService
            ]
        }).compile();
        vehicleService = await app.resolve(VehiclesService);
    });

    it('should be defined', () => {
        expect(vehicleService).toBeDefined();
    });

    describe('getVehicles', () => {
        it('should return an empty Array', () => {
            expect(vehicleService.getVehicles().length).toEqual(0);
        });

        it('should return a two-vehicle Array', () => {
            const cars = CARS;

            cars.forEach((car) => {
                vehicleService.addVehicle(car);
            });

            expect(vehicleService.getVehicles().length).toEqual(2);
        });
    })

    describe('getVehiclesById', () => {
        it('should return a Vehicle', () => {
            const cars = CARS;
            const index = 0;

            cars.forEach((car) => {
                vehicleService.addVehicle(car);
            });

            expect(vehicleService.getVehiclesById(index)).toBeDefined();
            expect(vehicleService.getVehiclesById(index)).toHaveProperty('brand', 'Chevrolet');
        })
    })

    describe('addVehicle', () => {
        it('should return a Vehicle', () => {
            const carMock = CARS[0];
            const spy = jest.spyOn(vehicleService, 'addVehicle');

            expect(vehicleService.addVehicle(carMock)).toBe(carMock);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(vehicleService.getVehicles()).toBeDefined();
            expect(vehicleService.getVehicles().length).toEqual(1);
            expect(vehicleService.getVehiclesById(0)).toHaveProperty('brand', 'Chevrolet');
        });
    });

    describe('editVehicle', () => {
        it('should edit a Vehicle', () => {
            const cars = CARS;
            const carMock = CAR_MOCK;
            const spy = jest.spyOn(vehicleService, 'editVehicle');

            cars.forEach((car) => {
                vehicleService.addVehicle(car);
            });

            expect(vehicleService.getVehicles().length).toEqual(2);
            expect(vehicleService.getVehiclesById(0)).toHaveProperty('brand', 'Chevrolet');

            expect(vehicleService.editVehicle(carMock, 0)).toBe(carMock);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(vehicleService.getVehicles()).toBeDefined();
            expect(vehicleService.getVehicles().length).toEqual(2);
            expect(vehicleService.getVehiclesById(0)).toHaveProperty('brand', 'Porsche');
        })
    })

    describe('removeVehicle', () => {
        it('should edit a Vehicle', () => {
            const cars = CARS;
            const spy = jest.spyOn(vehicleService, 'removeVehicle');

            cars.forEach((car) => {
                vehicleService.addVehicle(car);
            });

            expect(vehicleService.removeVehicle(0)).toBe(true);

            expect(spy).toHaveBeenCalledTimes(1);
            expect(vehicleService.getVehicles()).toBeDefined();
            expect(vehicleService.getVehicles().length).toEqual(1);
            expect(vehicleService.getVehiclesById(0)).toHaveProperty('brand', 'Ford');
        })
    })
})