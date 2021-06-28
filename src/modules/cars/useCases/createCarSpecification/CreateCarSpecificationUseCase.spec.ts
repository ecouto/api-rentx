import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    })

    it("Should not be able to add specification to a now-exists car", async () => {
        const car_id = '1234';
        const specifications_id = ["54321"];
        await expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })).rejects.toEqual(new AppError("Car does not exists!"));
    })

    it("Should be able to add specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Available",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1235",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "teste",
            name: "test"
        });
        const specifications_id = [specification.id];
        const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(specificationCars).toHaveProperty("specification");
        expect(specificationCars).toEqual(specificationCars);
    })
})