import nodemailer, { SendMailOptions } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export interface MailProps extends SendMailOptions {
  template: string;
  context: object;
}

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/nodemailer/'),
    },
    viewPath: path.resolve('./src/resources/nodemailer/'),
    extName: '.html',
  }),
);

export default transport;
