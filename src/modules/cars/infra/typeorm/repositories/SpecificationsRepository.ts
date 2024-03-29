import { ICreateSpecificationsDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";



class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationsDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name
        });

        return specification;
    }

    findByIds(ids: string[]): Promise<Specification[]> {
        const specification = this.repository.findByIds(ids)

        return specification;
    }

}

export { SpecificationsRepository };