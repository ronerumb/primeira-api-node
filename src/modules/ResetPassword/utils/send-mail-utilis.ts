import nodemailer from 'nodemailer'

export class UtilsSendMail{
    public static async send(email: string , secret : number){

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SEND_EMAIL,
                pass: process.env.SEND_EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from : process.env.SEND_EMAIL,
            to :  email,
            subject: "Resete sua senha",
            text : `Codigo de segurança ${secret}`,
        };
        await transporter.sendMail(mailOptions);
    }
}


