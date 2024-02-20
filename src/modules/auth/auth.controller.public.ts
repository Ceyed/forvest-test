import { Get } from '@nestjs/common';
import { AuthController } from 'libs/src/lib/decorators/auth-controller.decorator';
import { User } from 'libs/src/lib/decorators/user.decorator';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { AuthService } from './auth.service';

@AuthController('auth', SwaggerTagsEnum.Auth)
// ? I know.. 'AuthAuthController' ??
export class AuthAuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('profile')
  getProfile(@User() user) {
    return user;
  }
}
