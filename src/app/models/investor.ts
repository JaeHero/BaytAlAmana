import { Investment } from './investment';

export interface Investor {
  id: number;
  username: string;
  email: string;
  phone: string;
  investmentCount: number;
  profit: number;
  intendedInvestment: number;
  approved: boolean;
  public: boolean;
  createdAt: Date;
  admin: boolean;
  investments: Investment[];
}
