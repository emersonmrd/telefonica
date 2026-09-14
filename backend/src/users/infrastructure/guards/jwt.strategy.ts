import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ultra-secret-key-just-for-demo-purposes', // In production, use env variables
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}
