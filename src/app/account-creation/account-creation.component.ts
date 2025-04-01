import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { InputMask } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageModule } from 'primeng/message';

import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { InvestorService } from '../services/investor.service';
import { Investor } from '../models/investor';
@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    CardModule,
    InputTextModule,
    RouterLink,
    InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    InputSwitchModule,
    MessageModule,
  ],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css',
})
export class AccountCreationComponent implements OnInit {
  accountCreationForm!: FormGroup;
  investor: Investor = {} as Investor;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private investorService: InvestorService
  ) {}

  ngOnInit(): void {
    this.accountCreationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      public: [false],
      intendedInvestment: ['', Validators.required],
    });
  }

  // createAccount() {
  //   this.router.navigate(['']);
  // }

  createAccount() {
    if (this.accountCreationForm.valid) {
      this.investor = this.accountCreationForm.value;
      this.investor.createdAt = new Date();
      this.investorService.createUser(this.investor).subscribe(
        (investor) => {
          console.log(investor);
          this.router.navigate(['']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
