import { Request,Response,NextFunction } from "express";
import {z} from 'zod'; 
import jwt from 'jsonwebtoken';

export class MiddlewareAuth{
    public static async authenticate(req: Request, res:Response, next:NextFunction){

        const token = req.headers['authorization'] || '';
    try {
      const ZAuthSchema = z
        .string()
        .min(25, { message: 'Token é obrigatorio' });

      ZAuthSchema.parse(token);
    } catch (err: any) {
      console.log(err);
      return res.status(400).json({
        message: 'O Token é obrigatorio',
        erros: err.erros,
      });
    }

    try {
        await jwt.verify(token, `${process.env.JWT_SECRET}`);
      } catch (error) {
        return res.status(401).json({
          message: 'Não autorizado',
        });
      }

      const paramsId = req.params.id;
      const decoded = ((await jwt.decode(token)) as { payload: { id: string } })
        .payload;
  
      if (paramsId && paramsId !== decoded.id) {
        return res.status(400).json({
          message: 'Não encontrado',
        });
      }

        next();
    }
}