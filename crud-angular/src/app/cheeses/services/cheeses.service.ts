import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cheese } from '../model/cheese';
import { delay, first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheesesService {
  private readonly API = 'api/cheeses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Cheese[]>(this.API)
    .pipe(first(), delay(1000));
  }

  loadById(id: string) {
    return this.httpClient.get<Cheese>(`${this.API}/${id}`);
  }

  save(record: Partial<Cheese>) {
    // console.log(record);
    if (record._id) {
      // console.log('update');
      return this.update(record);
    }
    // console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Cheese>) {
    return this.httpClient.post<Cheese>(this.API, record).pipe(first());
  }

  private update(record: Partial<Cheese>) {
    return this.httpClient
      .put<Cheese>(`${this.API}/${record._id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
