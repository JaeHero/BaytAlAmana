import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { Router } from '@angular/router';
import { InvestmentService } from '../services/investment.service';
import { ImageModule } from 'primeng/image';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { VanillaTiltDirective } from '../vanilla-tilt.directive';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CarouselModule,
    TagModule,
    ButtonModule,
    ImageModule,
    MessagesModule,
    VanillaTiltDirective,
    CurrencyPipe,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  investment: Investment[] = [];
  messages: Message[] = [];

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    //  this.investmentService.getInvestments().then((products) => {
    //    this.products = products;
    //  });
    this.investmentService
      .getInvestments()
      .subscribe((investments: Investment[]) => {
        this.investment = investments;
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
    this.messages = [
      {
        severity: 'info',
        detail:
          'Great news! A new investment opportunity is now available. Check it out and be one of the first to invest!',
      },
    ];
  }

  constructor(
    private router: Router,
    private investmentService: InvestmentService
  ) {}
  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/investment-details', investment.id]);
  }
  goToCurrentDetails(investment: Investment) {
    this.router.navigate(['/current-details', investment.id]);
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
