import { Request, Response } from "express";
import {z} from 'zod';
import { resetPasswordService } from "../service/reset-password-service";

class ResetPasswordController{

    public async validadeUser(req: Request,res: Response){

        const email = req.body.email;

        try {
            const ZUserSchema = z.string().email({message : `Email é obrigatorio`});
            ZUserSchema.parse(email);
            
        } catch (err:any) {
            return res.status(400).json({
                message: err.erros,
            })
            
        }

        try {
            return res.json({
             message:'Código enviado para o email',
             data: await resetPasswordService.validateUser(email),
            })
        } catch (err:any) {
            return res.status(404).json({
                message: err.message,
            })
            
        }

    }

    public async validateSecurityCode(req: Request, res: Response) {
        const { email, secret } = req.body;
    
        try {
          const ZUserSchema = z.object({
            email: z.string().email({ message: `Email é obrigatorio` }),
            secret: z.string().min(6, { message: `Segredo é obrigatorio` }),
          });
    
          ZUserSchema.parse({ email, secret });
        } catch (err: any) {
          return res.status(400).json({
          
            error: err.errors,
          });
        }
    
        try {
          return res.json({
            message: 'Econtrado com sucesso',
            data: await resetPasswordService.validateSecurityCode(
              email,
              Number(secret),
            ),
          });
        } catch (err: any) {
          return res.status(404).json({
            message: err.message,
          });
        }
      }
   
      public async resetPassword(req: Request, res: Response) {
        const { email, secret, newPassword } = req.body;

        try {
            const ZUserSchema = z.object({
                email: z.string().email({ message: `Email é obrigatorio` }),
                secret: z.string().min(6, { message: `Segredo  é obrigatorio` }),
                newPassword: z
                    .string()
                    .min(8, { message: `Nova senha é obrigatorio` }),
            });

            ZUserSchema.parse({ email, secret, newPassword });
        } catch (err: any) {
            return res.status(400).json({

                error: err.errors,
            });
        }

        try {
            return res.json({
                message: 'Encontrado com sucesso',
                data: await resetPasswordService.resetPassword(
                    email,
                    Number(secret),
                    newPassword,
                ),
            });
        } catch (err: any) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }
}

export const resetPasswordController = new ResetPasswordController();