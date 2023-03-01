import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async plainTextEmail() {
    await this.mailService.sendMail({
      to: 'henriqueweiand@gmail.com',
      from: 'nani.bommidi93@gmail.com',
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
      template: 'index',
      context: {
        superHero: {
          name: 'henrique',
          powers: ['smart', 'string'],
        },
      },
    });
  }

  async postHTMLEmail() {
    await this.mailService.sendMail({
      to: 'henriqueweiand@gmail.com',
      from: 'nani.bommidi93@gmail.com',
      subject: 'HTML Dynamic Template',
      template: 'index',
      context: {
        superHero: 'teste',
      },
    });
  }
}
