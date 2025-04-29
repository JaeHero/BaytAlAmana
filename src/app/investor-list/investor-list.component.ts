import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Investor } from '../models/investor';
import { InvestorService } from '../services/investor.service';
import { DatePipe } from '@angular/common';


/*export interface Investor {
  id: number;
  name: string;
  username: string;
  public: boolean;
  creationDate: string;
}
  */

@Component({
  selector: 'app-investor-list',
  standalone: true,
  imports: [TagModule, NgStyle, ButtonModule, NgFor,DatePipe],
  templateUrl: './investor-list.component.html',
  styleUrl: './investor-list.component.css',
  providers: [DatePipe]
})
export class InvestorListComponent implements OnInit {

  investors: Investor[] = [];

  constructor(
    private router: Router,
    private investorService: InvestorService
  ) {}
 
  ngOnInit(): void {
    this.loadInitialInvestors();
  }
  goToDetails(investor: any): void {
    this.router.navigate(['/investor-details', investor.name]);
  }
  loadInitialInvestors(): void {
    this.investorService.getInvestors().subscribe((investors: Investor[]) => {
      this.investors = investors.filter((investor) => investor.public)
      .map((investor) => {
       investor.creationDate = new Date(investor.creationDate);
        return investor;
      });
      });
  }
  }


