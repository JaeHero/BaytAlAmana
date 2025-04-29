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
import { VanillaTiltDirective } from '../vanilla-tilt.directive';
import { investmentImage } from '../models/investment-image';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleriaModule } from 'primeng/galleria';
import { map, switchMap } from 'rxjs';
@Component({
  selector: 'app-investment-details',
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
    VanillaTiltDirective,
    GalleriaModule,
  ],
  templateUrl: './investment-details.component.html',
  styleUrl: './investment-details.component.css',
})
export class InvestmentDetailsComponent implements OnInit {
  // Initialize with an empty object (use Partial to allow partial initialization if some properties are missing)
  investment: Investment = {} as Investment;
  progressValue = 0;
  images: investmentImage[] = [];

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        // 1. grab the "id" param and convert to a number
        map((params) => {
          const id = Number(params.get('id'));
          if (isNaN(id) || id <= 0) {
            throw new Error('Invalid investment ID');
          }
          return id;
        }),
        // 2. switch to the HTTP call
        switchMap((id) =>
          this.investmentService.getInvestmentById(id.toString())
        )
      )
      .subscribe({
        next: (inv: Investment) => {
          this.investment = inv;

          // 3. sanitize each image URL
          this.images = (inv.images ?? []).map((img) => {
            const previewUrl = `https://drive.google.com/file/d/${img.url}/preview`;
            return {
              ...img,
              safeIframeUrl:
                this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl),
            };
          });
          console.log(this.images);

          // 4. compute progress as a number (progressValue is a number)
          if (inv.funding && inv.fundingGoal) {
            this.progressValue = (inv.funding / inv.fundingGoal) * 100;
          }
        },
        error: (err) => {
          console.error('Error loading investment details:', err);
          // you might want to redirect or show a toast here
        },
      });
  }

  goToContact() {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/contact']);
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
  responsiveOptions: any[] = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
}
