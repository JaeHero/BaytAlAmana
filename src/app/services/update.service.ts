import { Injectable } from '@angular/core';
import { Update } from '../models/update';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private update: Update | undefined;

  constructor(private httpClient: HttpClient) {}

  addUpdate(update: Update): Observable<Update> {
    return this.httpClient.post<Update>(
      enviroment.apiUrl + '/investment-update',
      update
    );
  }

  deleteUpdate(id: string): Observable<Update> {
    return this.httpClient.delete<Update>(
      enviroment.apiUrl + `/investment-update/${id}`
    );
  }

  updateUpdate(id: string, update: Update): Observable<Update> {
    return this.httpClient.put<Update>(
      enviroment.apiUrl + `/investment-update/${id}`,
      update
    );
  }
}
