import { Injectable } from '@angular/core';
import { Investment } from '../models/investment'; // Assuming Investment is an interface

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investment: Investment | undefined;

  constructor() {}

  getInvestments(): Investment {
    // REST request to get ALL investments
    this.investment = {
      id: 1,
      name: 'Brad Howell Inc.',
      status: 'Open',
      location: '2300 S. Washington St. Kokomo, IN',
      funding: '25,000',
      fundingGoal: '100,000',
      date: '10/19/24',
    };

    return this.investment;
  }

  getInvestmentById(id: string): Investment {
    //REST request to get investment by Id
    this.investment = {
      id: 1,
      name: 'Brad Howell Inc.',
      status: 'Open',
      location: '2300 S. Washington St. Kokomo, IN',
      funding: '25,000',
      fundingGoal: '100,000',
      date: '10/19/24',
    };

    return this.investment;
  }
}
