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
    public async listAll (req: Request, res:Response){

      const tokenUserId = req.tokenUserId;
      let page = Number(req.query.page);
      if(!page || page <=0 || isNaN(page)){
        page = 1;
      }
      try {
        return res.json({
          data : await userClientService.listAll(tokenUserId, page),
        })
        
      } catch (err:any) {

        return res.status(400).json({
          message: err.message,
        })
        
      }
    }
    public async update (req: Request, res:Response){
      const { name, email, phone } = req.body;
      const paramsId = req.params.id;
      const tokenUserId = req.tokenUserId;
  
      try {
        const ZClientShema = z.object({
          name: z.string().min(1, { message: 'Nome é obrigatorio' }),
          paramsId: z.string().min(30, { message: 'ID é obrigatorio' }),
        });
        ZClientShema.parse({ name, paramsId });
      } catch (err: any) {
        return res.status(400).json({
          
          error: err.errors,
        });
      }
  
      try {
        return res.json({
          message: 'Cliente atualizado',
          data: await userClientService.update(
            name,
            email,
            phone,
            paramsId,
            tokenUserId,
          ),
        });
      } catch (err: any) {
        return res.status(404).json({
          error: err.message,
        });
      }
          
      
    }
    public async delete (req: Request, res:Response){

      const paramsId = req.params.id;
      const tokenUserId = req.tokenUserId;
  
      try {
        const ZClientSchema = z
          .string()
          .min(30, { message: 'ID Obrigatorio' });
        ZClientSchema.parse(paramsId);
      } catch (err: any) {
        return res.status(400).json({
        
          error: err.erros,
        });
      }
  
      try {
        await userClientService.delete(paramsId, tokenUserId);
        return res.json({
          message: 'Deletado com sucesso',
        });
      } catch (err: any) {
        return res.status(404).json({
          error: err.message,
        });
      }
    }

    }



export const userClientController = new UserClientController();