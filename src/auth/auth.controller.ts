import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SingInDTO, SingUpDTO } from './dtos/authDTO';
import { AuthService } from './auth.service';
import { Public } from './decorators/SkipAuth.decorator';

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

  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      path: '/',
    });

    return { message: 'Logout realizado com sucesso' };
  }
}
