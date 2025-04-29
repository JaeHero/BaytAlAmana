import { investmentImage } from './investment-image';
import { Message } from './message';
import { Update } from './update';

export interface Investment {
  id: number;
  name: string;
  status: number;
  location: string;
  funding: number;
  fundingGoal: number;
  date: Date;
  expectedCloseDate: Date;
  investorCount: number;
  updates: Update[];
  images: investmentImage[];
  thumbnail: String;
}
