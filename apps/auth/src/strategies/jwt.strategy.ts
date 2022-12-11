
import {ExtractJwt, Strategy} from 'passport-jwt'
import {Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config'
import { JWTPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }
    
async validate(payload: JWTPayload): Promise<JWTPayload>{
    return {
        id: payload.id, 
        email: payload.email, 
        username: payload.username
    }
}
}
