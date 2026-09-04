export type CreatePlanInput = {
  name: string;
  description: string | null;
  price: number;
  dataAllowance: number;
  planType: string;
};
