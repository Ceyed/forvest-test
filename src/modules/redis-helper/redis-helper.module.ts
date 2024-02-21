import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisHelperService } from './redis-helper.service';

@Module({
  imports: [CacheModule.register()],
  providers: [RedisHelperService],
  exports: [RedisHelperService],
})
export class RedisHelperModule {}
