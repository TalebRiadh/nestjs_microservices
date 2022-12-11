import { GqlModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'apps/users/src/users.module';
import { UsersService } from 'apps/users/src/users.service';
import  * as Joi from 'joi';
import { AuthService } from './auth.service';
import { AuthMutationResolver } from './resolvers/auth.mutations.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [
    AuthService, 
    AuthMutationResolver, 
    LocalStrategy, 
    JwtStrategy
  ],
  imports: [
    UsersModule, 
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
        signOptions: {expiresIn: '10m' }
      })
    }
  )]
})
export class AuthModule {}
