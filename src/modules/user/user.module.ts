import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'libs/src/lib/entities/user/user.entity';
import { UserRepository } from 'libs/src/lib/entities/user/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserPublicController } from './user.public.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, UserPublicController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
