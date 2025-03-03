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

  addUsertoInvestment(
    investorId: number,
    investmentId: number
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      enviroment.apiUrl + '/user/' + investorId + '/investment/' + investmentId,
      {}
    );
  }

  removeUserFromInvestment(
    investorId: number,
    investmentId: number
  ): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      enviroment.apiUrl + '/user/' + investorId + '/investment/' + investmentId
    );
  }

  updateInvestor(investor: Investor): Observable<boolean> {
    return this.httpClient.put<boolean>(
      enviroment.apiUrl + '/user/' + investor.id,
      investor
    );
  }

  deleteInvestor(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(enviroment.apiUrl + '/user/' + id);
  }

  createUser(investor: Investor) {
    return this.httpClient.post<Investor>(
      enviroment.apiUrl + '/user',
      investor
    );
  }
}
