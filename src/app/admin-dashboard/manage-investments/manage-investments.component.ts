import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-investments',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    CardModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './manage-investments.component.html',
  styleUrl: './manage-investments.component.css',
})
export class ManageInvestmentsComponent {
  createAccount() {}
}
