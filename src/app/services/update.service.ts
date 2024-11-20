import { Injectable } from '@angular/core';
import { Update } from '../models/update';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private update: Update | undefined;

  constructor() {}

  getUpdates(): Update {
    this.update = {
      date: '12/3/24',
      cost: '24,500',
      note: 'New Roof',
    };
    return this.update;
  }
}
