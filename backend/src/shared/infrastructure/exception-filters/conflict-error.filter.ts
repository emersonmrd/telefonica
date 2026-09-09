import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ConflictError } from '../../domain/errors/conflict-error';

@Catch(ConflictError)
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(409).json({
      statusCode: 409,
      error: 'Conflict',
      message: exception.message,
    });
  }
}
