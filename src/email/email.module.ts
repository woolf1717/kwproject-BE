import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
        auth: {
          user: 'biuro@bartoszstpiczynski.pl',
          pass: 'Haslo123!',
        },
      },
      defaults: {
        from: '"Bartosz Stpiczyński" <biuro@bartoszstpiczynski.pl>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(), // Use EjsAdapter
      },
      options: {
        strict: false,
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
