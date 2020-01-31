import { Controller, Get, Render, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './auth/common/guards/login.guard';
import { AuthenticatedGuard } from './auth/common/guards/authenticate.guard';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root(
    @Request() req,
  ) {
    return {
      pageTitle: 'Pug test',
      youAreUsingPug: true,
    };
  }

  @UseGuards(LoginGuard)
  @Post('auth/login')
  @Render('profile')
  async login(
    @Request() req,
  ) {
    return {
      user: req.user,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  @Render('profile')
  async profile(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('restricted')
  @Render('restricted')
  async restricted(@Request() req) {
    return { user: req.user };
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
