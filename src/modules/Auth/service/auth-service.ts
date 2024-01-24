import { prismaConnect } from "prismaConn";
import bcrypt from 'bcrypt';
import { UtilsTokenAuth } from "../utils/token-utils";
import jwt from 'jsonwebtoken';


class AuthService{
    public async login(email:string ,password: string){

        const findUser = await prismaConnect.user.findUnique({
            where :{
                email:email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            }
        });
        
        if (!findUser){
             throw new Error('Usuario não encontrado');
        }

        if(!bcrypt.compareSync(password, findUser.password)){
            throw new Error('Não autorizado');
        }

        return UtilsTokenAuth.jwtGenerate(findUser);

    }
    public async token(refreshToken: string){

        try {
            await jwt.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`,);
        } catch (error) {

            throw new Error('Não autorizado');
            
        }

        const decode = (await jwt.decode(refreshToken)as {payload : { id:string}}).payload;

        const findUser =  await prismaConnect.user.findUnique({
            where: {
                id: decode.id,
            }, select: {
                id: true,
                name: true,
                email: true,
                password: true,
            }
        });
        if(!findUser){
            throw new Error('Não encontrado')
        }

        return  UtilsTokenAuth.jwtGenerate(findUser);
            
        }

    }


export const authService = new AuthService();