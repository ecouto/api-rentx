import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute(
            {
                name: "Name car",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            }
        );

        expect(car).toHaveProperty("id")
    });

    it("Should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute(
            {
                name: "Car1",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            }
        );
        await expect(createCarUseCase.execute(
            {
                name: "Car2",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            }
        )).rejects.toEqual(new AppError("Car Already exists!"));
    });

    it("Should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute(
            {
                name: "Car Available",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1235",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            }
        );

        expect(car.available).toBe(true)
    });
});