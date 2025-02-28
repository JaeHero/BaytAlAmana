import { Investment } from './investment';

export interface Investor {
  id: number;
  username: string;
  email: string;
  phone: string;
  investmentCount: number;
  profit: number;
  intendedInvestment: number;
  isApproved: boolean;
  isPublic: boolean;
  createdAt: Date;
  isAdmin: boolean;
  investments: Investment[];
}
