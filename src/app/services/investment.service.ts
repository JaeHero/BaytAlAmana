import { Injectable } from '@angular/core';
import { Investment } from '../models/investment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private investment: Investment | undefined;
  private date: Date = new Date('10/19/24');
  private expectedCloseDate: Date = new Date('01/15/25');

  constructor(private httpClient: HttpClient) {}

  getInvestments(): Observable<Investment[]> {
    return this.httpClient.get<Investment[]>(
      enviroment.apiUrl + '/investments'
    );
  }

  getInvestmentById(id: string): Observable<Investment> {
    return this.httpClient.get<Investment>(
      enviroment.apiUrl + `/investment/${id}`
    );
  }

  createInvestment(investment: Investment): Observable<Investment> {
    return this.httpClient.post<Investment>(
      enviroment.apiUrl + '/investment',
      investment
    );
  }

  deleteInvestment(id: string): Observable<Investment> {
    return this.httpClient.delete<Investment>(
      enviroment.apiUrl + `/investment/${id}`
    );
  }

  updateInvestment(id: string, investment: Investment): Observable<Investment> {
    return this.httpClient.put<Investment>(
      enviroment.apiUrl + `/investment/${id}`,
      investment
    );
  }

  helloWorld() {
    this.httpClient
      .get('http://localhost:8080/api/v1/investment/investments/2')
      .subscribe((data) => {
        console.log(JSON.stringify(data));
      });
  }

  getInvestmentsByInvestorId(investorId: string): Observable<Investment[]> {
    return this.httpClient.get<Investment[]>(
      enviroment.apiUrl + `/user/${investorId}/investments`
    );
  }

  getAvailableInvestments(investorId: string): Observable<Investment[]> {
    return this.httpClient.get<Investment[]>(
      enviroment.apiUrl + `/user/${investorId}/available-investments`
    );
  }

  uploadImages(formData: FormData, investmentId: number): Observable<string[]> {
    return this.httpClient.post<string[]>(
      enviroment.apiUrl + `/upload-images/${investmentId}`,
      formData
    );
  }
}
