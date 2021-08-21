import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { appLogger } from 'src/services/logger/app-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const isError = exception instanceof Error

    const message = isError ?  exception.message : null
    const stack = isError ?  exception.stack : null

    
    appLogger.error(message, {
      stack,
      status,
      path: request.url
    })

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // 
      message,
      stack
    });
  }
}