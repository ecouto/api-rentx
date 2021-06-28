import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersResponseDTO } from '../dtos/IUsersResponseDTO';
import { classToClass } from 'class-transformer';



class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url
    }: User): IUsersResponseDTO {
        const user = classToClass({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url
        })
        return user;
    }
}


export { UserMap }