export type UpdatePlanInput = {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  dataAllowance?: number | null;
  speed?: number | null;
  planType?: string;
};
