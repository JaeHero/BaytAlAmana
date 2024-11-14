import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { Investment } from '../../models/investment';
import { InvestmentService } from '../../services/investment.service';

interface Status {
  status: string;
}

@Component({
  selector: 'app-manage-investments',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    CardModule,
    InputTextModule,
    RouterLink,
    CalendarModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    CarouselModule,
    TagModule,
  ],
  templateUrl: './manage-investments.component.html',
  styleUrl: './manage-investments.component.css',
})
export class ManageInvestmentsComponent implements OnInit {
  statuses: Status[] | undefined = [];
  investment: Investment[] = [];

  responsiveOptions: any[] | undefined;

  selectedStatus: Status | undefined;
  showForm = false;

  constructor(
    private investmentService: InvestmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.statuses = [
      { status: 'New' },
      { status: 'In Progress' },
      { status: 'Closed' },
    ];
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

  createAccount() {}
  date: Date | undefined;
  value1: number = 0;
  value2: number = 0;

  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/investment-details', investment.id]);
  }
}
