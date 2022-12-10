import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const DatabaseConfiguration = (configService: ConfigService): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: "postgres",
    url: configService.get('DATABASE_URL'),
    autoLoadEntities: true,
    synchronize: true,
  };
  return options;
};
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: DatabaseConfiguration,
      inject: [ConfigService],

    }),
  ],
})
export class OrmModule {}

