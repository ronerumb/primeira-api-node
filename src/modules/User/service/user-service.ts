import { PrismaClient } from '@prisma/client';
import {Request , Response} from 'express';
import { prismaConnect } from 'prismaConn';
import bcrypt from 'bcrypt';
import { UtilsFileUser } from '../../../utils/file-utils';
import { json } from 'stream/consumers';
import { error } from 'console';

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

    UtilsFileUser.createFolderUser(create.id);
    return create;
 }

 public async read(paramsId:string){
    const findUser = await prismaConnect.user.findUnique({
        where: {
            id : paramsId,
        },
        select:{
            id : true,
            name: true,
            email: true
        }
    });
    if(!findUser){
        throw new Error('Usuario não econtrado');
    }

   
    
    return findUser;
 }


 public async update(paramsId:string, name:string){
    const findUser = await prismaConnect.user.findUnique({
        where: {
            id : paramsId,
        }     
    });
    if(!findUser){
        throw new Error('Usuario não econtrado');
    }
    const update = prismaConnect.user.update({
        where: {
            id: paramsId,
        },
        data: {
            name: name,
        },
        select: {
            id: true,
            name: true,
            email:true,
        }
    })


   
    
    return update;
 }
 public async delete(paramsId:string){
    try {
        
        UtilsFileUser.deleteFolderUser(paramsId);
        return await prismaConnect.user.delete({
            where: {
                id: paramsId,
            }
        })
        
    } catch (err:any) {
        throw new Error('Dados não encontrados');
        
    }
 
   

   
    
  
 }

}


export const userService = new UserService();