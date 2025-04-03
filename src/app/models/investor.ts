import { Investment } from './investment';
import { Message } from './message';

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
  messages: Message[];
}
