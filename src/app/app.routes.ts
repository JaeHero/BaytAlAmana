import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { InvestmentDetailsComponent } from './investment-details/investment-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'investment-details/:id', component: InvestmentDetailsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
