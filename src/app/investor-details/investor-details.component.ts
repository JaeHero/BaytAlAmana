import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { InvestmentService } from '../services/investment.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { InvestorService } from '../services/investor.service';
import { Investor } from '../models/investor';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-investor-details',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    TagModule,
    CheckboxModule,
    AvatarModule,
    CommonModule,
    FieldsetModule,
    InputTextModule,
    InputSwitchModule,
    ReactiveFormsModule,
  ],
  templateUrl: './investor-details.component.html',
  styleUrl: './investor-details.component.css',
})
export class InvestorDetailsComponent {
  investment: Investment[] = [];
  availableInvestments: Investment[] = [];
  responsiveOptions: any[] | undefined;
  investor: any;
  selectedInvestor: Investor = {} as Investor;
  investmentForm!: FormGroup;
  constructor(
    private investmentService: InvestmentService,
    private investorService: InvestorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.investor = this.route.snapshot.paramMap.get('id');
    console.log(this.investor);
    this.getInvestor();
    this.getInvestorInvestments();
    this.getAvailableInvestments();

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

  getInvestor() {
    this.investorService
      .getInvestorById(this.investor)
      .subscribe((investor: Investor) => {
        this.selectedInvestor = investor;
        // Initialize form after we have the investor data
        this.investmentForm = this.formBuilder.group({
          approved: [this.selectedInvestor.approved],
          public: [this.selectedInvestor.public],
          admin: [this.selectedInvestor.admin],
        });
      });
  }

  getInvestorInvestments() {
    this.investmentService
      .getInvestmentsByInvestorId(this.investor)
      .subscribe((investments: Investment[]) => {
        this.investment = investments;
      });
  }

  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/investment-details', investment.id]);
  }

  // addUsertoInvestment(investmentId: number) {
  //   this.investorService
  //     .addUsertoInvestment(this.investor, investmentId)
  //     .subscribe((response: boolean) => {
  //       console.log(response);
  //       this.getInvestorInvestments();
  //     });
  // }

  getAvailableInvestments() {
    this.investmentService
      .getAvailableInvestments(this.investor)
      .subscribe((investments: Investment[]) => {
        this.availableInvestments = investments;
      });
  }

  addUserToInvestment(investmentId: number) {
    this.investorService
      .addUsertoInvestment(this.investor, investmentId)
      .subscribe((response: boolean) => {
        console.log(response);
        this.getInvestorInvestments();
        this.getAvailableInvestments();
      });
  }

  removeUserFromInvestment(investmentId: number) {
    this.investorService
      .removeUserFromInvestment(this.investor, investmentId)
      .subscribe((response: boolean) => {
        console.log(response);
        this.getInvestorInvestments();
        this.getAvailableInvestments();
      });
  }

  saveInvestor() {
    this.selectedInvestor.approved = this.investmentForm.value.approved;
    this.selectedInvestor.public = this.investmentForm.value.public;
    this.selectedInvestor.admin = this.investmentForm.value.admin;

    this.investorService
      .updateInvestor(this.selectedInvestor)
      .subscribe((response: boolean) => {
        console.log(response);
      });
  }

  deleteInvestor() {
    this.investorService
      .deleteInvestor(this.investor)
      .subscribe((response: boolean) => {
        console.log(response);
        this.router.navigate(['/admin']);
      });
  }
}
