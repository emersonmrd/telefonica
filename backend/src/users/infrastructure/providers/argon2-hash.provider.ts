import * as argon2 from 'argon2';
import { HashProvider } from '../../domain/providers/hash.provider';

export class Argon2HashProvider implements HashProvider {
  async hash(payload: string): Promise<string> {
    return argon2.hash(payload);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return argon2.verify(hashed, payload);
  }
}
