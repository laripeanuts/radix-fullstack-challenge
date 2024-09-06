import { EnvService } from '@/config/env/env.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';

const userPayloadSchema = z.object({
  sub: z.string(),
  name: z.string(),
  email: z.string(),
});

export type UserPayloadSchema = z.infer<typeof userPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: UserPayloadSchema) {
    return userPayloadSchema.parse(payload);
  }
}
