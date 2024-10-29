import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { InvestmentDetailsComponent } from './investment-details/investment-details.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { InvestorListComponent } from './investor-list/investor-list.component';
import { InvestorDetailsComponent } from './investor-details/investor-details.component';
import { LoginComponent } from './login/login.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { CurrentDetailsComponent } from './current-details/current-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account-creation', component: AccountCreationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'investment-details/:id', component: InvestmentDetailsComponent },
  { path: 'current-details/:id', component: CurrentDetailsComponent },
  { path: 'info', component: InfoComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'investors', component: InvestorListComponent },
  // { path: 'investor-details/:name', component: InvestorDetailsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
