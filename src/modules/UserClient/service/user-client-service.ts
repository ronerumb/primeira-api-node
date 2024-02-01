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
    public async listAll(tokenUserId : string , page : number ){
        const pageSize = 11;
        const skip = (page - 1) * pageSize;

        const findUser = await prismaConnect.user.findMany({
            where : {
                id: tokenUserId
            },
            include : {
                userClient : {
                    skip,
                    take: pageSize
                }
            }
        })

        if (!findUser){
            throw new Error('Não econtrado')
        }

        const totalCount = await prismaConnect.userClient.count({
            where : {
                userId : tokenUserId,
            },
        });

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            page,
            pageSize,
            totalCount,
            totalPages,
            client : findUser[0].userClient,
        }

        
     }
    public async update( name: string,
        email: string,
        phone: number,
        paramsId: string,
        tokenUserId: string) { 

            const findUserClient = await prismaConnect.userClient.findFirst({
                where: {
                  id: paramsId,
                  userId: tokenUserId,
                },
              });
          
              if (!findUserClient) {
                throw new Error('Não encontrado');
              }
          
              const update = await prismaConnect.userClient.update({
                where: {
                  id: paramsId,
                },
                data: {
                  name,
                  email,
                  phone,
                },
              });
          
              return update;
        }
        public async delete(paramsId: string, tokenUserId: string) {
            const findUserClient = await prismaConnect.userClient.findFirst({
              where: {
                id: paramsId,
                userId: tokenUserId,
              },
            });
        
            if (!findUserClient) {
              throw new Error('Não encontrado');
            }
        
            const deletUserClient = await prismaConnect.userClient.delete({
              where: {
                id: paramsId,
              },
            });
        
            UtilsFileUser.deleteFolderUser([
              deletUserClient.userId,
              deletUserClient.id,
            ]);
        
            return deletUserClient;
          }
}


export const userClientService = new UserClientService();