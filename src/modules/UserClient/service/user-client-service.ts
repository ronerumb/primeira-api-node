import { prismaConnect } from "prismaConn";
import { UtilsFileUser } from "utils/file-utils";


class UserClientService {
    public async create(tokenUserId: string, name: string, email: string, phone: number) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: tokenUserId
            }
        });
        if (!findUser) {
            throw new Error('Não encontrado')
        }

        const create = await prismaConnect.userClient.create({
            data: {
                name, email, phone, userId: tokenUserId
            }
        })

        UtilsFileUser.createFolderUser([create.userId, create.id]);

        return create;
    }
    public async read(paramsId: string, tokenUserId: string) {
        const findUserClient = await prismaConnect.userClient.findFirst({
            where: {
                id: paramsId,
                userId: tokenUserId,
            },


        });

        if (!findUserClient) {
            throw new Error('Não encontrado');
        }


    }
    public async listAll() { }
    public async update() { }
    public async delete() { }
}


export const userClientService = new UserClientService();