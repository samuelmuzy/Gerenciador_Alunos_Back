import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SingInDTO, SingUpDTO } from './dtos/authDTO';
import { AuthService } from './auth.service';
import { Public } from './decorators/SkipAuth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import type { Payload } from 'src/types/TokenJwtPayload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async singUp(
    @Body() body: SingUpDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.singUp(body, res);
  }

  @Public()
  @Post('singin')
  async singIn(
    @Body() body: SingInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.singIn(body, res);
  }

  @Public()
  @Post('singin-professor')
  async singInProfessor(
    @Body() body: SingInDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.singInProfessor(body, res);
  }

  @Get('me')
  getMe(@CurrentUser() user: Payload) {
    return user;
  }

  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      path: '/',
    });

    return { message: 'Logout realizado com sucesso' };
  }
}
