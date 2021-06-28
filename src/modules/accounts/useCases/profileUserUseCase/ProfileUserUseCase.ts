import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { IUsersResponseDTO } from '@modules/accounts/dtos/IUsersResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';



@injectable()
class ProfileUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute(id: string): Promise<IUsersResponseDTO> {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase }