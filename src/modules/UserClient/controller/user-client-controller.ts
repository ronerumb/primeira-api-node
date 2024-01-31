import { Request, Response } from "express"
import {z} from 'zod'
import { userClientService } from "../service/user-client-service";


class UserClientController {
    public async create (req: Request, res:Response){
        const {name, email , phone} = req.body;
        const tokenUserId = req.tokenUserId;
        try {

            const ZClientSchema = z.string().min(1 , 'Nome é obrigatorio');
                ZClientSchema.parse(name);
            
        } catch (err:any) {
            return res.status(400).json({
                error : err.message,
            })
            
        }


        try {

            return res.json({
                message: 'Criado com sucesso',
                data: await userClientService.create(tokenUserId, name,email,Number(phone)),
            })
            
        } catch (err:any) {

            return res.status(404).json({
                error : err.message,
            })
            
        }
    }
    public async read (req: Request, res:Response){
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;
    
        try {
          const ZClientSchema = z
            .string()
            .min(30, { message: 'ID é obrigatorio' });
    
          ZClientSchema.parse(paramsId);
        } catch (err: any) {
          return res.status(400).json({
        
            error: err.errors,
          });
        }
    
        try {
          return res.json({
            message: 'Deu certo',
            data: await userClientService.read(paramsId, tokenUserId),
          });
        } catch (err: any) {
          return res.status(404).json({
            error: err.message,
          });
        }
    }
    public async listAll (req: Request, res:Response){}
    public async update (req: Request, res:Response){}
    public async delete (req: Request, res:Response){}
}


export const userClientController = new UserClientController();