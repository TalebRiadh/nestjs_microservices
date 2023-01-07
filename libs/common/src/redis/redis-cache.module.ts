import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store'
import { RedisPubSub } from 'graphql-redis-subscriptions';
/*
@Module({
  imports: [
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: '6379',
      }),
      isGlobal: true,
    }),
  ],
  providers: [RedisCacheService],
})*/

export const PUB_SUB ='PUB_SUB'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      inject: [],
      useFactory: () =>
      new RedisPubSub({
        connection: {
          host: 'redis',
          port: 6379,
        }
      })
    }
  ],
  exports: [PUB_SUB]
})


export class PubsubModule {}