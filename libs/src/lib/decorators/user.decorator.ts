import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayloadInterface } from '../interfaces/token-payload.interface';

export const User = createParamDecorator(
  (data: keyof TokenPayloadInterface, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userFromRequest: TokenPayloadInterface = request.user;
    return data ? userFromRequest[data] : userFromRequest;
  },
);
