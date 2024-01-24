import { Request,Response } from "express";
import {z} from 'zod'; 
import { authService } from "../service/auth-service";


class AuthController{
    public async login(req:Request, res:Response){
        const {email,password} = req.body;
        try {
            const ZUserSchema = z.object({
                email: z.string().email({message: 'Email é obrigatorio'}),
                password : z.string().min(1,{message: 'Senha é obrigatoria'}),
            });
            ZUserSchema.parse({email,password});
            
        } catch (err:any) {
            return res.status(400).json({
                message: 'Dados invalidos',
                data: err.errors,
            });
            
        }
        try {

            return res.json({
                data : await authService.login(email,password),
            })
         
        } catch (err: any) {
            switch (err.message) {
                case 'Usuario não encontrado':
                    return res.status(404).json({
                        message: err.message,
                    })
                    
                    break;

                case 'Não autorizado':
                return res.status(401).json({
                    message: err.message,
                })
                
                break;

            
                default:
                    break;
            }
        }

    }
    public async token(req:Request, res:Response){

        const token = req.headers['authorization'] || '';

        try {

            const zAuthSchema = z.string().min(25, {message: 'Token é obrigatorio' });
            zAuthSchema.parse(token);
            
        } catch (err:any) {
            return res.status(400).json({
                message: 'Dados invalidos',
                data: err.errors,
            });
            
        }

        try {
            return res.json({
                data: await authService.token(token),
            })
            
        } catch (err:any) {

            return res.status(401).json({
                message: err.message,
            })

            
            
        }



    }
}

export const authController = new AuthController();