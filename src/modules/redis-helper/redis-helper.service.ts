import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisEntityEnum } from 'libs/src/lib/enums/redis-entities.enum';

export class RedisHelperService {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  getKey(entity: RedisEntityEnum, id: string): string {
    // * id -> ['all', 'a159c0f1-fd89-4aa4-bfa3-6c2af8340076']
    return `${entity}:${id}`;
  }

  get<T>(key: string): Promise<T> {
    return this._cacheManager.get(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this._cacheManager.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this._cacheManager.del(key);
  }
}
