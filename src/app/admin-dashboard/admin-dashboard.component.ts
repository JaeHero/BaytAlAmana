import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, JsonPipe } from '@angular/common';
import { Investor } from '../models/investor';
import { InvestorService } from '../services/investor.service';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { ManageInvestmentsComponent } from './manage-investments/manage-investments.component';
import { ManageMessagingComponent } from './manage-messaging/manage-messaging.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TableModule,
    TabViewModule,
    ManageInvestmentsComponent,
    ManageMessagingComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private investorService: InvestorService,
    private router: Router
  ) {}
  investors: Investor[] = [];
  selectedInvestor!: Investor;
  ngOnInit(): void {
    this.investorService.getInvestors().subscribe((investors: Investor[]) => {
      this.investors = investors;
      console.log(this.investors);
    });
  }
  onRowSelect(event: any) {
    this.router.navigate(['/investor-details', this.selectedInvestor.id]);
  }
}
