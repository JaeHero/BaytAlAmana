import { Injectable } from '@angular/core';
import { Investor } from '../models/investor';

@Injectable({
  providedIn: 'root',
})
export class InvestorService {
  private investor: Investor | undefined;

  constructor() {}

  getInvestors(): Investor {
    this.investor = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@gmail.com',
      password: '@&$%*(#($*',
      phone: '7654316341',
      investmentAmount: '$50000',
      isPublic: true,
      funding: '$42000',
      investorProfit: '$6220',
    };

    return this.investor;
  }

  getInvestorById(id: string): Investor {
    this.investor = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'JohnDoe@gmail.com',
      password: '@&$%*(#($*',
      phone: '7654316341',
      investmentAmount: '$50000',
      isPublic: true,
      funding: '$42000',
      investorProfit: '$6220',
    };

    return this.investor;
  }
}
