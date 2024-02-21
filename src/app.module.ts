import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { RedisHelperModule } from './modules/redis-helper/redis-helper.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig as TypeOrmModuleOptions),
    CacheModule.register(),
    AuthModule,
    UserModule,
    BookModule,
    UploadModule,
    RedisHelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
