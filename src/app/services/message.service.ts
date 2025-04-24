import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserMessageService {
  constructor(private httpClient: HttpClient) {}

  createMessage(message: Message): Observable<Message> {
    return this.httpClient.post<Message>(
      enviroment.apiUrl + '/message',
      message
    );
  }

  deleteMessage(id: string): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(
      enviroment.apiUrl + '/message' + '/' + id
    );
  }

  updateMessage(id: string, message: Message): Observable<Message> {
    return this.httpClient.put<Message>(
      enviroment.apiUrl + `/message/${id}`,
      message
    );
  }
}
