
import {Request , Response} from 'express';

import {z} from 'zod';
import { userService } from '../service/user-service';


class UserController{
 public async create(req:Request , res:Response){
    const {name , email , password} = req.body;
   try{
    const ZUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email({message: 'Email é obrigatorio'}),
        password: z.string().min(8,{message:'Senha obrigatoria'}),
    });
        ZUserSchema.parse({name,email,password});
   }catch(err: any){
    return res.status(400).json({
        message:'Dados invalidos',
        error: err.errors,
    });   

   };

   try{
    return res.json({
        message: "Criada com sucesso",
        data: await userService.create(name,email,password),
    });

   }catch(err:any){
       return res.status(409).json({
        message: err.message,
       })
   }

   
 }
}

export const userController = new UserController();