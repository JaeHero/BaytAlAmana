import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    CardModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css',
})
export class AccountCreationComponent {
  constructor(private router: Router) {}
  createAccount() {
    this.router.navigate(['']);
  }
}
