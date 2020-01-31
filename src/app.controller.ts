import { Controller, Get, Render, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return {
      pageTitle: 'Pug test',
      youAreUsingPug: true,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @Render('profile')
  async login(
    @Request() req,
  ) {
    return {
      user: req.user,
    };
  }
}
