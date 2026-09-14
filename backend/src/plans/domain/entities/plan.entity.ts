export class Plan {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public price: number,
    public dataAllowance: number | null, // Gigabytes para planos móveis
    public speed: number | null, // Mbps para planos de fibra
    public planType: string, // 'PRE', 'CONTROLE', 'POS', 'FIBRA'
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
  // Aqui é onde ficariam regras de negócio puras.
  // Ex: applyDiscount(percentage: number) { this.price -= ... }
}
