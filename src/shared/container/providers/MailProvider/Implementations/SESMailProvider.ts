import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import AWS from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from "handlebars";
import fs from 'fs';


@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });
        
       this.client = nodemailer.createTransport({
           SES: new AWS.SES({
               apiVersion: '2010-12-01',
               region: process.env.AWS_REGION
           })
       })
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = handlebars.compile(templateFileContent);

        const templateHtml = templateParse(variables);

        await this.client.sendMail({
            to,
            from: 'Rentx <erick@ecouto.me>',
            subject,
            html: templateHtml
        })
    }

}

export { SESMailProvider }