
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
       });
   };   
 }

 public async read(req:Request, res:Response){
    const paramsId = req.params.id;
    try {
        const ZUserSchema = z.string().min(30 , 'ID é obrigatorio');
        ZUserSchema.parse(paramsId)
    } catch (err: any) {
        return res.status(400).json({
            menssage: 'Dado invalido',
            error : err.errors,
        })
        
    }
    try {
        return res.json({
            data : await userService.read(paramsId),
        })
        
    } catch (err:any) {

        return res.status(400).json({
            message : err.message,
        });
        
    }

   
   

 }

 public async update(req:Request, res:Response){
    const {name} = req.body;
    const paramsId = req.params.id;
    try {
        const ZUserSchema =  z.object({
            name: z.string().min(2,{message:'Nome é obrigatorio'}),
            paramsId: z.string().min(30, {message: 'ID é obrigatorio'}),
       
        });
        ZUserSchema.parse({name,paramsId});
    } catch (err: any) {
        return res.status(400).json({
            menssage: 'Dado invalido',
            error : err.errors,
        })
        
    }
    try {
        return res.json({
            message: 'Deu certo',
            data : await await userService.update(paramsId,name),
        })
        
    } catch (err:any) {

        return res.status(400).json({
            message : err.message,
        });
        
    }


}

public async delete(req:Request, res:Response){
    const paramsId = req.params.id;
    try {
        const ZUserSchema = z.string().min(30 , 'ID é obrigatorio');
        ZUserSchema.parse(paramsId)
    } catch (err: any) {
        return res.status(400).json({
            menssage: 'Dado invalido',
            error : err.errors,
        })
        
    }
    try {
        return res.json({
            data : await userService.delete(paramsId),
        })
        
    } catch (err:any) {

        return res.status(400).json({
            message : err.message,
        });
        
    }

   
   

 }
}


export const userController = new UserController();