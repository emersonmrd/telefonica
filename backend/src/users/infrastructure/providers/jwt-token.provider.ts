import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenProvider } from '../../domain/providers/token.provider';

@Injectable()
export class JwtTokenProvider implements TokenProvider {
  constructor(private readonly jwtService: JwtService) {}

  async generate(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
