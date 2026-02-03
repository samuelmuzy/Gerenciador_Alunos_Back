import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger('ExceptionFilter');
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const rawMessage =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception instanceof Error
            ? exception.message
            : 'Internal server error';

      const message = typeof rawMessage === 'string'
        ? rawMessage
        : typeof (rawMessage as { message?: string | string[] })?.message === 'string'
          ? (rawMessage as { message: string }).message
          : Array.isArray((rawMessage as { message?: string[] })?.message)
            ? (rawMessage as { message: string[] }).message.join(', ')
            : JSON.stringify(rawMessage);

      this.logger.error(
        `${request.method} ${request.url} ${status} - ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }