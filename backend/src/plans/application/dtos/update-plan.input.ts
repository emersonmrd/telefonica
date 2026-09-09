export type UpdatePlanInput = {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  dataAllowance?: number;
  planType?: string;
};
