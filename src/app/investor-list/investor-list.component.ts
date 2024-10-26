import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investor-list',
  standalone: true,
  imports: [TagModule, NgStyle, ButtonModule, NgFor],
  templateUrl: './investor-list.component.html',
  styleUrl: './investor-list.component.css',
})
export class InvestorListComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadInitialInvestors();
  }
  investors: any[] = [];
  goToDetails(investor: any): void {
    this.router.navigate(['/investor-details', investor.name]);
  }
  loadInitialInvestors(): void {
    this.investors = [
      { id: 1, name: 'Ava', funding: 'April, 2024', status: 'Active' },
      { id: 2, name: 'Liam', funding: 'August, 2021', status: 'Active' },
      { id: 3, name: 'Olivia', funding: 'December, 2023', status: 'Inactive' },
      { id: 4, name: 'Noah', funding: 'March, 2024', status: 'Active' },
      { id: 5, name: 'Emma', funding: 'July, 2022', status: 'Inactive' },
      { id: 6, name: 'Ethan', funding: 'October, 2022', status: 'Inactive' },
      { id: 7, name: 'Sophia', funding: 'February, 2023', status: 'Inactive' },
      { id: 8, name: 'Lucas', funding: 'June, 2023', status: 'Inactive' },
    ];
  }
}
