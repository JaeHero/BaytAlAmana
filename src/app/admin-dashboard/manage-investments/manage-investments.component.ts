import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

interface Status {
  status: string;
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
  ],
  templateUrl: './manage-investments.component.html',
  styleUrl: './manage-investments.component.css',
})
export class ManageInvestmentsComponent implements OnInit {
  statuses: Status[] | undefined = [];

  selectedStatus: Status | undefined;

  ngOnInit() {
    this.statuses = [
      { status: 'New' },
      { status: 'In Progress' },
      { status: 'Closed' },
    ];
  }

  createAccount() {}
  date: Date | undefined;
  value1: number = 142000;
  value2: number = 36600;
}
