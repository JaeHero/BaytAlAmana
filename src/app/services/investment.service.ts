import { Injectable } from '@angular/core';
import { Investment } from '../models/investment';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investment: Investment | undefined;

  constructor() {}

  getInvestments(): Investment {
    this.investment = {
      id: 1,
      name: 'Brad Howell Inc.',
      status: 'Open',
      location: '2300 S. Washington St. Kokomo, IN',
      funding: '25,000',
      fundingGoal: '100,000',
      date: '10/19/24',
      expectedCloseDate: '01/15/25',
    };

    return this.investment;
  }

  getInvestmentById(id: string): Investment {
    this.investment = {
      id: 1,
      name: 'Brad Howell Inc.',
      status: 'Open',
      location: '2300 S. Washington St. Kokomo, IN',
      funding: '25,000',
      fundingGoal: '100,000',
      date: '10/19/24',
      expectedCloseDate: '01/15/25',
    };

    return this.investment;
  }
}
