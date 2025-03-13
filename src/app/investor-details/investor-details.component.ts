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
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Message } from '../models/message';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from '../services/message.service';

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
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    CardModule,
    TableModule,
    InputNumberModule,
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
  messageForm!: FormGroup;
  date: Date | undefined;
  messages: Message[] = [];
  message: Message = {} as Message;
  selectedMessage!: Message;
  editMode: boolean = false;

  constructor(
    private investmentService: InvestmentService,
    private investorService: InvestorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.investor = this.route.snapshot.paramMap.get('id');
    console.log(this.investor);
    this.editMode = false;
    this.getInvestor();
    this.getInvestorInvestments();
    this.getAvailableInvestments();
    this.messageForm = this.formBuilder.group({
      date: ['', Validators.required],
      message: ['', Validators.required],
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
        this.messages = this.selectedInvestor.messages;
        // Initialize form after we have the investor data
        this.investmentForm = this.formBuilder.group({
          approved: [this.selectedInvestor.approved],
          public: [this.selectedInvestor.public],
          admin: [this.selectedInvestor.admin],
          profit: [this.selectedInvestor.profit],
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
    this.selectedInvestor.profit = this.investmentForm.value.profit;

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

  selectMessage() {
    this.editMode = true;
    this.message = this.selectedMessage;
    this.messageForm.patchValue(this.selectedMessage);
    let newDate = new Date(this.selectedMessage.date);
    newDate.setDate(newDate.getDate() + 1);
    this.date = newDate;
  }

  saveMessage() {
    if (this.messageForm.valid && !this.editMode) {
      this.message = this.messageForm.value;
      this.message.userId = Number(this.investor);
      this.messageService.createMessage(this.message).subscribe({
        next: (message: Message) => {
          this.messages.push(message);
          console.log(message);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else if (this.messageForm.valid && this.editMode) {
      this.updateMessage();
    }
  }

  deleteMessage(id: string) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.getInvestor();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  updateMessage() {
    this.message = this.messageForm.value;
    this.message.id = this.selectedMessage.id;
    this.message.userId = Number(this.investor);
    console.log(this.message);
    this.messageService
      .updateMessage(this.message.id.toString(), this.message)
      .subscribe({
        next: (message: Message) => {
          this.messages.push(message);
          this.getInvestor();
          this.resetMessage();
        },
        error: (err: any) => {
          console.log(err);
          this.resetMessage();
        },
      });
  }

  resetMessage() {
    this.messageForm.reset();
    this.editMode = false;
  }
}
