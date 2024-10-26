import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { InvestmentService } from '../services/investment.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-investor-details',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './investor-details.component.html',
  styleUrl: './investor-details.component.css',
})
export class InvestorDetailsComponent {
  investment: Investment[] = [];
  responsiveOptions: any[] | undefined;
  investor: any;

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get route parameters
  ) {}
  ngOnInit() {
    //  this.investmentService.getInvestments().then((products) => {
    //    this.products = products;
    //  });
    this.investor = this.route.snapshot.paramMap.get('name');
    console.log(this.investor);

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
