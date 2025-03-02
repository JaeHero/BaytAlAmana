import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { InvestmentService } from '../services/investment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageModule, CarouselModule, TagModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  investment: Investment[] = [];
  openInvestments: Investment[] = [];
  inProgressInvestment: Investment[] = [];
  closedInvestment: Investment[] = [];

  responsiveOptions: any[] | undefined;

  constructor(
    private investmentService: InvestmentService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.investmentService.helloWorld();
    this.investmentService
      .getInvestments()
      .subscribe((investments: Investment[]) => {
        this.investment = investments;
        this.openInvestments = this.investment.filter(
          (investment) => investment.status === 1
        );
        this.inProgressInvestment = this.investment.filter(
          (investment) => investment.status === 2
        );
        this.closedInvestment = this.investment.filter(
          (investment) => investment.status === 3
        );
      });
    console.log(this.investment);

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/investment-details', investment.id]);
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Open';
      case 2:
        return 'In-Progress';
      case 3:
        return 'Closed';
      default:
        return 'Pending';
    }
  }
}
