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
  approved: boolean;
  public: boolean;
  createdAt: Date;
  admin: boolean;
  investments: Investment[];
  messages: Message[];
}
