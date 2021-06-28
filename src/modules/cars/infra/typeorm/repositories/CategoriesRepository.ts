import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository, IcreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';


import { getRepository, Repository } from "typeorm";


class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: IcreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        });

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };