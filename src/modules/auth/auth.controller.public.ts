import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'libs/src/lib/decorators/public-route.decorator';
import { User } from 'libs/src/lib/decorators/user.decorator';
import { LoginDto } from 'libs/src/lib/dtos/users/login.dto';
import { TokenDto } from 'libs/src/lib/dtos/users/token.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthPublicController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this._authService.login(loginDto);
  }

  @Get('profile')
  getProfile(@User() user) {
    return user;
  }
}
