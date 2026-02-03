import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { winstonLogger } from './config/wiston.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.ts';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: winstonLogger,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
