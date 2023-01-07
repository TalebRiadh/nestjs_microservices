import { GqlModule } from '@app/common';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { User } from './domain/models/user';
import { UserMutationsResolver } from './infrastructure/resolvers/user.mutations.resolver';
import { UsersService } from './application/users.service';
import { ProductsModule } from 'apps/products/src/products.module';
import { OrdersModule } from 'apps/orders/src/orders.module';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    forwardRef(() => OrdersModule),

    TypeOrmModule.forFeature([User]),
    GqlModule,
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
