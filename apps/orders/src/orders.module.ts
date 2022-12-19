import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OrmModule, RmqModule } from '@app/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.schema';
import { BILLING_SERVICE } from './constants/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'apps/auth/src/auth.module';
import { UsersModule } from 'apps/users/src/users.module';
import { ProductsModule } from 'apps/products/src/products.module';


@Module({
  imports: [
    OrmModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([Order]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    RmqModule.register({
      name: BILLING_SERVICE
    })
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}