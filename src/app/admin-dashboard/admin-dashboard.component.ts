import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Investor } from '../models/investor';
import { InvestorService } from '../services/investor.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [TableModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  constructor(private investorService: InvestorService) {}
  investors: Investor[] = [];
  ngOnInit(): void {
    for (let index = 0; index < 6; index++) {
      this.investors.push(this.investorService.getInvestors());
    }
  }
}
