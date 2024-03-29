import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from 'libs/src/lib/entities/file/file.repository';
import { UserBookmarkRepository } from 'libs/src/lib/entities/user-bookmarks/user-bookmarks.repository';
import { UserEntity } from 'libs/src/lib/entities/user/user.entity';
import { UserRepository } from 'libs/src/lib/entities/user/user.repository';
import { RedisHelperModule } from '../redis-helper/redis-helper.module';
import { UserController } from './user.controller';
import { UserPublicController } from './user.public.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RedisHelperModule],
  controllers: [UserController, UserPublicController],
  providers: [UserService, UserRepository, UserBookmarkRepository, FileRepository],
})
export class UserModule {}
