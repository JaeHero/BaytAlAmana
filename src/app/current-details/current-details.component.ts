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
import { NgStyle, CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Update } from '../models/update';
import { UpdateService } from '../services/update.service';
import { VanillaTiltDirective } from '../vanilla-tilt.directive';
import { investmentImage } from '../models/investment-image';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs';
import { GalleriaModule } from 'primeng/galleria';

interface Status {
  label: string;
  value: number;
}

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
    CurrencyPipe,
    VanillaTiltDirective,
    GalleriaModule,
  ],
  templateUrl: './current-details.component.html',
  styleUrl: './current-details.component.css',
})
export class CurrentDetailsComponent {
  // Initialize with an empty object (use Partial to allow partial initialization if some properties are missing)
  investment: Investment = {} as Investment;
  images: investmentImage[] = [];
  progressValue = 0;
  updates: Update[] = [];
  statuses: Status[] = [
    { label: 'Open', value: 1 },
    { label: 'In-Progress', value: 2 },
    { label: 'Closed', value: 3 },
  ];

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to get route parameters
    private updateService: UpdateService,
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
          this.updates = inv.updates;

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
