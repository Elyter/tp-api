import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || '8f7d3b2a1e6c9f4a5d8e7b0c3a2f1e9d',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    return { 
      userId: payload.sub, 
      username: payload.username, 
      roles: payload.roles 
    };
  }
}
