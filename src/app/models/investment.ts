export interface Investment {
  id: number;
  name: string;
  status: string;
  location: string;
  funding: number;
  fundingGoal: number;
  date: Date;
  expectedCloseDate: Date;
  investorCount: number;
}
