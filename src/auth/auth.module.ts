import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';
console.log(jwtConstants.secret)

@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],

})
export class AuthModule { }
