export class Plan {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public price: number,
    public dataAllowance: number, // Quantidade de Gigabytes
    public planType: string, // 'PRE', 'CONTROLE', 'POS'
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
  // Aqui é onde ficariam regras de negócio puras.
  // Ex: applyDiscount(percentage: number) { this.price -= ... }
}
