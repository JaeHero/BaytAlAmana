import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ButtonDirective } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { InvestmentService } from '../services/investment.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router'; // Import ActivatedRoute to get route params
import { Investment } from '../models/investment';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Update } from '../models/update';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-current-details',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ButtonDirective,
    SplitterModule,
    ProgressBarModule,
    TagModule,
    NgStyle,
    RouterLink,
    TableModule,
  ],
  templateUrl: './current-details.component.html',
  styleUrl: './current-details.component.css',
})
export class CurrentDetailsComponent {
  // Initialize with an empty object (use Partial to allow partial initialization if some properties are missing)
  investment: Investment | null = null;
  progressValue = 0;
  updates: Update[] = [];

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the route parameter
    const investmentId = this.route.snapshot.paramMap.get('id');

    // Fetch investment details using the ID
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
    for (let index = 0; index < 3; index++) {
      this.updates.push(this.updateService.getUpdates());
    }
  }
  goToContact() {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/contact']);
  }
}
