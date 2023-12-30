import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  @Render('index')
  getHello(): object {
    return { title: 'Title', subtitle: 'Subtitle' };
  }

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.welcomeEmailPlain(createEmailDto);
  }
}
