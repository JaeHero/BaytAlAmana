import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { InvestmentService } from '../services/investment.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { InvestorService } from '../services/investor.service';
import { Investor } from '../models/investor';

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
  selectedInvestor: Investor | undefined;

  constructor(
    private investmentService: InvestmentService,
    private investorService: InvestorService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get route parameters
  ) {}
  ngOnInit() {
    //  this.investmentService.getInvestments().then((products) => {
    //    this.products = products;
    //  });
    this.investor = this.route.snapshot.paramMap.get('id');
    console.log(this.investor);

    this.investmentService
      .getInvestments()
      .subscribe((investments: Investment[]) => {
        this.investment = investments;
      });

    this.investorService
      .getInvestorById(this.investor)
      .subscribe((investor: Investor) => {
        this.selectedInvestor = investor;
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
}
