import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedError } from '../../domain/errors/unauthorized-error';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.UNAUTHORIZED;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: 'Unauthorized',
    });
  }
}
