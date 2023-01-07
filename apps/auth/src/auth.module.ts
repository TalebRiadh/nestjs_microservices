import { RmqModule } from '@app/common';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'apps/users/src/users.module';
import  * as Joi from 'joi';
import { AuthService } from './application/auth.service';
import { AuthMutationResolver } from './infrastructure/resolvers/auth.mutations.resolver';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { ProductsModule } from 'apps/products/src/products.module';
import { OrdersModule } from 'apps/orders/src/orders.module';


@Module({
  providers: [
    AuthService, 
    AuthMutationResolver, 
    LocalStrategy, 
    JwtStrategy
  ],
  imports: [
    forwardRef(() => ProductsModule),
    forwardRef(() => UsersModule),
    RmqModule,
    PassportModule, 
    ConfigModule.forRoot({ 
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
     }),
    JwtModule.registerAsync(
    {
      imports: [
        ConfigModule,
      ],
      
      inject: [ConfigService],
      useFactory: (ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        //signOptions: {expiresIn: '10m' }
      })
    }
  )]
})
export class AuthModule {}
