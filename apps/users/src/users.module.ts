import { GqlModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { User } from './entities/user.entity';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    GqlModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ 
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/users/.env',
     }),
  ],
  providers: [UsersService, UserMutationsResolver],
  exports: [UsersService],
})
export class UsersModule {}
