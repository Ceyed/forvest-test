import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'libs/src/lib/entities/user/user.repository';
import { AuthGuard } from 'libs/src/lib/guards/auth.guard';
import { serverConfig } from 'src/configs/server.config';
import { AuthAuthController } from './auth.controller.public';
import { AuthPublicController } from './auth.public.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: serverConfig.jwt_access_token_secret,
      signOptions: { expiresIn: serverConfig.jwt_access_token_expiration_time },
    }),
  ],
  controllers: [AuthAuthController, AuthPublicController],
  providers: [
    AuthService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
