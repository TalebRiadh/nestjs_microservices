import { GqlModule, OrmModule } from '@app/common';
import { Module, forwardRef } from '@nestjs/common';
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
    OrmModule,
    GqlModule,
    TypeOrmModule.forFeature([Product]),
    ConfigModule.forRoot({ 
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/products/.env',
     }),
     forwardRef(() => UsersModule),
     forwardRef(() => OrdersModule),
     AuthModule,

  ],
  providers: [ProductsService, ProductMutationsResolver, ProductQueriesResolver],
})
export class ProductsModule {}
