import { Injectable } from '@angular/core';
import { Investor } from '../models/investor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class InvestorService {
  private investor: Investor | undefined;

  constructor(private httpClient: HttpClient) {}

  getInvestors(): Observable<Investor[]> {
    return this.httpClient.get<Investor[]>(enviroment.apiUrl + '/users');
  }

  getInvestorById(id: number): Observable<Investor> {
    return this.httpClient.get<Investor>(enviroment.apiUrl + '/user/' + id);
  }
}
