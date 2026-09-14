export interface TokenProvider {
  generate(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
