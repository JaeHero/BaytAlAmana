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

  helloWorld() {
    this.httpClient
      .get('http://localhost:8080/api/v1/investment/investments/2')
      .subscribe((data) => {
        console.log(JSON.stringify(data));
      });
  }
}
