import { HashProvider } from '../../providers/hash.provider';

export const mockHashProvider = (): jest.Mocked<HashProvider> => ({
  hash: jest.fn(),
  compare: jest.fn(),
});
