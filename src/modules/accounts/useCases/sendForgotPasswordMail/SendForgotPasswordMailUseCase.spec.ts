import { AppError } from '@shared/errors/AppError';
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot email", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    })

    it('Should be able to send a forgot email to user', async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "104254",
            email: "nehfo@tor.st",
            name: "dvurVP",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("nehfo@tor.st");

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to send an email if user does not exists!', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('jocak@vuifuzi.ve')
        ).rejects.toEqual(new AppError('User does not exists!'))
    });

    it('Should be able o create an users token', async () => {
        const generateTokenEmail = spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "537115",
            email: "gikec@hegis.do",
            name: "OZamyd",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute('gikec@hegis.do');

        expect(generateTokenEmail).toBeCalled();
    });
})