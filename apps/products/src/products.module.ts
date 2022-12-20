import { GqlModule, OrmModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './application/products.service';
import * as Joi from 'joi'
import { Product } from './domain/models/product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMutationsResolver } from './infrastructure/resolvers/product.mutations.resolver';
import { ProductQueriesResolver } from './infrastructure/resolvers/product.queries.resolver';
import { UsersModule } from 'apps/users/src/users.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { OrdersModule } from 'apps/orders/src/orders.module';

@Module({
  imports: [
    OrdersModule,
    OrmModule,
    GqlModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([Product]),
    ConfigModule.forRoot({ 
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/products/.env',
     }),

  ],
  providers: [ProductsService, ProductMutationsResolver, ProductQueriesResolver],
})
export class ProductsModule {}
