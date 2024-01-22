import { PrismaClient } from '@prisma/client';
import {Request , Response} from 'express';
import { prismaConnect } from 'prismaConn';
import bcrypt from 'bcrypt';

class UserService{
 public async create(name:string, email:string ,password:string){
    const findUser = await prismaConnect.user.findUnique({
        where: {
            email,
        },
    });
    if(findUser){
        throw new Error('Dados já existentes');
    }

    const create = await prismaConnect.user.create({
        data:{
            name,
            email,
            password: await bcrypt.hashSync(password,6),
        },
        select: {
            id:true,
            name:true,
            email:true
        }
    });
    return create;
 }
}


export const userService = new UserService();