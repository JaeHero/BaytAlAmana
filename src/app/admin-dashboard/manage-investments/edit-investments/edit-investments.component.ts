import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { Investment } from '../../../models/investment';
import { InvestmentService } from '../../../services/investment.service';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { HttpClient } from '@angular/common/http';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { Update } from '../../../models/update';
import { UpdateService } from '../../../services/update.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface Status {
  label: string;
  value: number;
}

@Component({
  selector: 'app-edit-investments',
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
    InputGroupModule,
    InputGroupAddonModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-investments.component.html',
  styleUrl: './edit-investments.component.css',
})
export class EditInvestmentsComponent implements OnInit {
  statuses: Status[] = [
    { label: 'New', value: 1 },
    { label: 'In-Progress', value: 2 },
    { label: 'Closed', value: 3 },
  ];
  selectedStatus: string = '';
  //investment: Investment = {} as Investment;
  investmentForm!: FormGroup;
  updateForm!: FormGroup;
  // Initialize with an empty object (use Partial to allow partial initialization if some properties are missing)
  investment: Investment = {} as Investment;
  progressValue = 0;
  uploadedFiles: any[] = [];
  updates: Update[] = [];
  update: Update = {} as Update;
  selectedUpdate!: Update;
  investmentId!: string;
  editMode: boolean = false;

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {
    this.investmentId = this.route.snapshot.paramMap.get('id')!;
    this.editMode = false;
    if (this.investmentId) {
      this.getInvestment(this.investmentId);
    }
    this.investmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      expectedCloseDate: ['', Validators.required],
      fundingGoal: ['', Validators.required],
      funding: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.updateForm = this.formBuilder.group({
      date: ['', Validators.required],
      cost: ['', Validators.required],
      description: ['', Validators.required],
    });
    // Get the 'id' from the route parameter
    this.investmentId = this.route.snapshot.paramMap.get('id')!;

    if (this.investmentId) {
      this.getInvestment(this.investmentId);
    }
  }

  getInvestment(id: string) {
    this.investmentService.getInvestmentById(id).subscribe({
      next: (investment: Investment) => {
        this.investment = investment;
        this.investmentForm.patchValue(investment);
        this.expectedCloseDate = new Date(investment.expectedCloseDate);
        this.date = new Date(investment.date);
        this.updates = investment.updates;
      },
    });
  }

  saveInvestment() {
    if (this.investmentForm.valid) {
      this.investment = this.investmentForm.value;
      this.investmentService
        .updateInvestment(this.investmentId, this.investment)
        .subscribe({
          next: (investment: Investment) => {
            this.investment = investment;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Investment updated successfully',
            });
            this.getInvestment(this.investmentId);
          },
          error: (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Investment update failed',
            });
          },
        });
    }
  }

  date: Date | undefined;
  expectedCloseDate: Date | undefined;
  updateDate: Date | undefined;

  onUpload(event: UploadEvent | any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onSelect(event: Date) {
    console.log(event);
  }

  saveUpdate() {
    if (this.updateForm.valid && !this.editMode) {
      this.update = this.updateForm.value;
      this.update.investmentId = Number(this.investmentId);
      this.updateService.addUpdate(this.update).subscribe({
        next: (update: Update) => {
          this.updates.push(update);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update created successfully',
          });
          this.getInvestment(this.investmentId);
          this.updateForm.reset();
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update creation failed',
          });
        },
      });
    } else if (this.updateForm.valid && this.editMode) {
      this.updateUpdate();
    }
  }

  deleteUpdate(id: string) {
    this.updateService.deleteUpdate(id).subscribe({
      next: () => {
        this.getInvestment(this.investmentId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update deleted successfully',
        });
        this.getInvestment(this.investmentId);
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Update deletion failed',
        });
      },
    });
  }
  selectUpdate() {
    this.editMode = true;
    this.update = this.selectedUpdate;
    this.updateForm.patchValue(this.selectedUpdate);
    let newDate = new Date(this.selectedUpdate.date);
    newDate.setDate(newDate.getDate() + 1);
    this.updateDate = newDate;
  }
  updateUpdate() {
    this.update = this.updateForm.value;
    this.update.id = this.selectedUpdate.id;
    this.update.investmentId = Number(this.investmentId);
    console.log(this.update);
    this.updateService
      .updateUpdate(this.update.id.toString(), this.update)
      .subscribe({
        next: (update: Update) => {
          this.updates.push(update);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update updated successfully',
          });
          this.getInvestment(this.investmentId);
          this.resetUpdate();
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update update failed',
          });
          this.resetUpdate();
        },
      });
  }
  resetUpdate() {
    this.updateForm.reset();
    this.editMode = false;
  }
}
