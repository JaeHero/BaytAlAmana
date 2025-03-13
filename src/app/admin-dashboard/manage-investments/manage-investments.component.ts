import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';

import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { Investment } from '../../models/investment';
import { InvestmentService } from '../../services/investment.service';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

interface Status {
  label: string;
  value: number;
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
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
    FileUploadModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './manage-investments.component.html',
  styleUrl: './manage-investments.component.css',
})
export class ManageInvestmentsComponent implements OnInit {
  statuses: Status[] = [
    { label: 'Open', value: 1 },
    { label: 'In-Progress', value: 2 },
    { label: 'Closed', value: 3 },
  ];
  investment: Investment[] = [];
  openInvestments: Investment[] = [];
  inProgressInvestments: Investment[] = [];
  closedInvestments: Investment[] = [];
  newInvestment: Investment = {} as Investment;
  responsiveOptions: any[] | undefined;
  uploadedFiles: any[] = [];

  showForm = false;
  investmentForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private investmentService: InvestmentService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.investmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      expectedCloseDate: ['', Validators.required],
      fundingGoal: ['', Validators.required],
      funding: ['', Validators.required],
      status: [null, Validators.required],
    });
    this.getInvestments();
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

  createInvestment() {
    console.log(this.investmentForm.value);
    if (this.investmentForm.valid) {
      this.newInvestment = this.investmentForm.value;
      this.investmentService.createInvestment(this.newInvestment).subscribe(
        (response: Investment) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Investment created successfully',
          });
          this.getInvestments();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Investment creation failed',
          });
        }
      );
      this.investmentForm.reset();
    }
  }
  date: Date | undefined;
  expectedCloseDate: Date | undefined;
  value1: number = 0;
  value2: number = 0;

  goToDetails(investment: Investment) {
    this.router.navigate(['/edit-investment', investment.id]);
  }

  onUpload(event: UploadEvent | any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  onSelect(event: Date) {
    console.log(event);
  }

  getInvestments() {
    this.investmentService
      .getInvestments()
      .subscribe((investments: Investment[]) => {
        this.investment = investments;
        this.openInvestments = this.investment.filter(
          (investment) => investment.status === 1
        );
        this.inProgressInvestments = this.investment.filter(
          (investment) => investment.status === 2
        );
        this.closedInvestments = this.investment.filter(
          (investment) => investment.status === 3
        );
      });
  }

  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this investment?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Delete',
      closeOnEscape: true,
      acceptButtonStyleClass: 'p-button p-button-danger',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Investment deleted',
          life: 3000,
        });
        this.deleteInvestment(id);
      },
      // reject: () => {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Rejected',
      //     detail: 'You have rejected',
      //     life: 3000,
      //   });
      // },
    });
  }

  deleteInvestment(id: string) {
    this.investmentService.deleteInvestment(id).subscribe(
      (response: Investment) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Investment deleted successfully',
        });
        this.getInvestments();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Investment deletion failed',
        });
      }
    );
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
