import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Investment } from '../models/investment';
import { InvestmentService } from '../services/investment.service';
import { Router } from '@angular/router';
import { AosDirective } from '../aos.directive';
import { NgOptimizedImage } from '@angular/common';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageModule, CarouselModule, TagModule, ButtonModule, AosDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  investment: Investment[] = [];
  openInvestments: Investment[] = [];
  inProgressInvestment: Investment[] = [];
  closedInvestment: Investment[] = [];

  responsiveOptions: any[] | undefined;

  constructor(
    private investmentService: InvestmentService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // this.investmentService.helloWorld();
    this.investmentService.getInvestments().subscribe((raw) => {
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
      this.openInvestments = this.investment.filter(
        (investment) => investment.status === 1
      );
      this.inProgressInvestment = this.investment.filter(
        (investment) => investment.status === 2
      );
      this.closedInvestment = this.investment.filter(
        (investment) => investment.status === 3
      );
      console.log('OPEN INVESTMENTS: ', this.openInvestments);
      console.log('IN PROGRESS INVESTMENTS: ', this.inProgressInvestment);
      console.log('CLOSED INVESTMENTS: ', this.closedInvestment);
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
  goToDetails(investment: Investment) {
    // Assuming investment.id is the unique identifier for the investment
    this.router.navigate(['/investment-details', investment.id]);
  }
  getDrivePreviewUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://drive.google.com/file/d/${id}/preview`
    );
  }
  // component.ts
  getDriveImageUrl(fileId: string): string {
    // “export=view” gives you a direct image link
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
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
