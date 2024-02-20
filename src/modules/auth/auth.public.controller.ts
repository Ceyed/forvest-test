import { Body, Post } from '@nestjs/common';
import { PublicController } from 'libs/src/lib/decorators/public-controller.decorator';
import { LoginDto } from 'libs/src/lib/dtos/users/login.dto';
import { TokenDto } from 'libs/src/lib/dtos/users/token.dto';
import { SwaggerTagsEnum } from 'libs/src/lib/enums/swagger-tags.enum';
import { AuthService } from './auth.service';

@PublicController('auth', SwaggerTagsEnum.Auth)
export class AuthPublicController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this._authService.login(loginDto);
  }
}
