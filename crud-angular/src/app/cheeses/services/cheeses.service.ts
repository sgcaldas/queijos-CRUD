import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cheese } from '../model/cheese';
import { CheesePage } from '../model/cheese-page';

import { delay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheesesService {
  private readonly API = 'api/cheeses';

  constructor(private httpClient: HttpClient) {}

  list(pageNumber = 0, pageSize = 10) {
    return this.httpClient.get<CheesePage>(this.API, { params: {pageNumber, pageSize} })
    .pipe(first(), delay(200));
  }

  loadById(id: string) {
    return this.httpClient.get<Cheese>(`${this.API}/${id}`);
  }

  save(record: Partial<Cheese>) {
    if (record._id) {
      return this.update(record);
    }
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
