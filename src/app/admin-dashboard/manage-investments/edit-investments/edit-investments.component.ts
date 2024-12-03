import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
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

interface Status {
  status: string;
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
  ],
  templateUrl: './edit-investments.component.html',
  styleUrl: './edit-investments.component.css',
})
export class EditInvestmentsComponent {
  // Initialize with an empty object (use Partial to allow partial initialization if some properties are missing)
  investment: Investment | null = null;
  progressValue = 0;
  statuses: Status[] | undefined = [];
  uploadedFiles: any[] = [];
  selectedStatus: Status | undefined;
  updates: Update[] = [];
  selectedUpdate!: Update;

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the route parameter
    const investmentId = this.route.snapshot.paramMap.get('id');

    if (investmentId) {
      this.investmentService.getInvestmentById(investmentId).subscribe({
        next: (investment: Investment) => {
          this.investment = investment;

          // Calculate the progress value if funding and fundingGoal are available
          if (this.investment.funding && this.investment.fundingGoal) {
            this.progressValue =
              (this.investment.funding / this.investment.fundingGoal) * 100;
          }
        },
        error: (error) => {
          console.error('Error fetching investment:', error);
        },
      });
    }
    this.statuses = [
      { status: 'Open' },
      { status: 'In Progress' },
      { status: 'Closed' },
    ];

    for (let index = 0; index < 8; index++) {
      this.updates.push(this.updateService.getUpdates());
    }
    this.investmentService.helloWorld();
  }
  goToContact() {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/contact']);
  }

  date: Date | undefined;
  value1: number = 100000;
  value2: number = 25000;
  value3: number = 0;

  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/edit-investment', investment.id]);
  }

  onUpload(event: UploadEvent | any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  selectUpdate() {}
}
