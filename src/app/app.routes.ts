import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { InvestmentDetailsComponent } from './investment-details/investment-details.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { InvestorListComponent } from './investor-list/investor-list.component';
import { InvestorDetailsComponent } from './investor-details/investor-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'investment-details/:id', component: InvestmentDetailsComponent },
  { path: 'info', component: InfoComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'investors', component: InvestorListComponent },
  { path: 'investor-details/:name', component: InvestorDetailsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
