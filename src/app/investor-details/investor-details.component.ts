import { Component, inject, Inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { InvestmentService } from '../services/investment.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { InvestorService } from '../services/investor.service';
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
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserMessageService } from '../services/message.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Investor } from '../models/investor';
import { DomSanitizer } from '@angular/platform-browser';

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
    ToastModule,
    ConfirmPopupModule,
    FormsModule,
  ],
  templateUrl: './investor-details.component.html',
  styleUrl: './investor-details.component.css',
  providers: [ConfirmationService, MessageService, UserMessageService],
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
    @Inject(Router) private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userMessageService: UserMessageService,
    private confirmationService: ConfirmationService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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

  async getInvestor() {
    this.investorService
      .getInvestorById(this.investor)
      .subscribe((investor: Investor) => {
        this.selectedInvestor = investor;
        this.messages = this.selectedInvestor.messages;
        // Initialize form after we have the investor data
        console.log(investor);
        this.investmentForm = this.formBuilder.group({
          approved: [this.selectedInvestor.approved ?? false, Validators.required],
          public: [this.selectedInvestor.public ?? false, Validators.required],
          admin: [this.selectedInvestor.admin ?? false, Validators.required],
          profit: [this.selectedInvestor.profit ?? 0, Validators.required],
        });
      });
  }

  getInvestorInvestments() {
    this.investmentService
      .getInvestmentsByInvestorId(this.investor)
      .subscribe((raw) => {
        this.investment = raw.map((inv) => {
          if (inv.images?.length) {
            const fileId = inv.images[0].url;
            const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            return {
              ...inv,
              safeIframeUrl:
                this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl),
            };
          }
          return inv;
        });
      });
  }

  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/investment-details', investment.id]);
  }

  getAvailableInvestments() {
    this.investmentService
      .getAvailableInvestments(this.investor)
      .subscribe((raw) => {
        this.availableInvestments = raw.map((inv) => {
          if (inv.images?.length) {
            const fileId = inv.images[0].url;
            const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            return {
              ...inv,
              safeIframeUrl:
                this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl),
            };
          }
          return inv;
        });
      });
  }

  confirmAddUserToInvestment(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to add this investment',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Add',
      closeOnEscape: true,
      acceptButtonStyleClass: 'p-button p-button-success',
      accept: () => {
        this.addUserToInvestment(id);
      },
    });
  }

  addUserToInvestment(id: number) {
    this.investorService
      .addUsertoInvestment(this.selectedInvestor.id, id)
      .subscribe({
        next: () => {
          this.getInvestor();
          this.getInvestorInvestments();
          this.getAvailableInvestments();
        },
        error: (error: any) => {
          console.error('Error adding user to investment', error);
        },
      });
  }

  confirmUserRemoval(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to remove user from investment?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Remove',
      closeOnEscape: true,
      acceptButtonStyleClass: 'p-button p-button-danger',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Investment deleted',
          life: 3000,
        });
        this.removeUserFromInvestment(id);
      },
    });
  }

  confirmAlertRemoval(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this alert?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Remove',
      closeOnEscape: true,
      acceptButtonStyleClass: 'p-button p-button-danger',
      accept: () => {
        this.deleteMessage(id);
      },
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

    console.log(this.investmentForm.value.approved);

    this.investorService.updateInvestor(this.selectedInvestor).subscribe({
      next: (response: boolean) => {
        console.log('RESPONSE', response);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.router.navigate(['/admin']);
  }

  confirmDeleteInvestor(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Delete ' + this.selectedInvestor?.username + '?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Delete',
      closeOnEscape: true,
      acceptButtonStyleClass: 'p-button p-button-danger',
      accept: () => {
        this.deleteInvestor();
      },
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
      this.userMessageService.createMessage(this.message).subscribe({
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
    this.userMessageService.deleteMessage(id).subscribe({
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
    this.userMessageService
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