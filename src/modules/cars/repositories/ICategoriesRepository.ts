import { Category } from '@modules/cars/infra/typeorm/entities/Category';


interface IcreateCategoryDTO {
    name: string,
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: IcreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, IcreateCategoryDTO };