import { Component } from '@angular/core';
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
export class HomeComponent {
  investment: Investment[] = [];

  responsiveOptions: any[] | undefined;

  constructor(
    private investmentService: InvestmentService,
    private router: Router
  ) {}

  ngOnInit() {
    //  this.investmentService.getInvestments().then((products) => {
    //    this.products = products;
    //  });
    for (let index = 0; index < 6; index++) {
      this.investment.push(this.investmentService.getInvestments());
    }
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
}
