export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  forbidden: boolean;
}

// Array of Skip objects is returned directly from the API
export type SkipsResponse = Skip[];

export interface StepProps {
  step:
    | "Postcode"
    | "Waste Type"
    | "Select Skip"
    | "Permit Check"
    | "Choose Date"
    | "Payment";
  status: "completed" | "current" | "pending";
}
