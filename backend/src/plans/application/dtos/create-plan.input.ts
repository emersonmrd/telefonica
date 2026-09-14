export type CreatePlanInput = {
  name: string;
  description: string | null;
  price: number;
  dataAllowance?: number | null;
  speed?: number | null;
  planType: string;
};
