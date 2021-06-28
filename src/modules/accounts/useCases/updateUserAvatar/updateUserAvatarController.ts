import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";



class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const avatar_file = request.file.filename;

        const createUserController = new CreateUserController();

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };