import { Request, Response } from "express";
import { prismaConnect } from "prismaConn";
import { UtilsSendMail } from "../utils/send-mail-utilis";
import bcrypt from 'bcrypt';


class ResetPasswordService {

    public async validateUser(email: string) {

        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            },
            include: {
                resetPasswordSecret: true,
            },
        });
        if (!findUser) {
            throw new Error('Não encontrado');
        }
        if (!findUser.resetPasswordSecret) {
            const genereteSecret = Number(
                Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join(''),
            );
            const { secret } = await prismaConnect.resetPasswordSecret.create({
                data: {
                    secret: genereteSecret,
                    userId: findUser.id,
                },
                select: {
                    secret: true,
                },
            });
            UtilsSendMail.send(email, secret);
            return { email, secret };

        }
        UtilsSendMail.send(email, findUser.resetPasswordSecret.secret);
        return { email, secret: findUser.resetPasswordSecret.secret }

    }

    public async validateSecurityCode(email: string, secret: number) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            },
            include: {
                resetPasswordSecret: true,
            },
        });

        if (
            !findUser ||
            !findUser.resetPasswordSecret ||
            findUser.resetPasswordSecret.secret !== secret
        ) {
            throw new Error('Não encontrado');
        }

        return { email, secret };
    }

    public async resetPassword(
        email: string,
        secret: number,
        newPassword: string,
      ) {
        const findUser = await prismaConnect.user.findUnique({
          where: {
            email,
          },
          include: {
            resetPasswordSecret: true,
          },
        });
    
        if (
          !findUser ||
          !findUser.resetPasswordSecret ||
          findUser.resetPasswordSecret.secret !== secret
        ) {
          throw new Error('não econtrado');
        }
    
        const update = await prismaConnect.user.update({
          where: {
            email,
          },
          data: {
            password: bcrypt.hashSync(newPassword, 6),
          },
          select: {
            name: true,
            email: true,
          },
        });
    
        await prismaConnect.resetPasswordSecret.delete({
          where: {
            userId: findUser.id,
          },
        });
    
        return update;
      }




}

export const resetPasswordService = new ResetPasswordService();