import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Cheese } from '../model/cheese';
import { CheesesService } from '../services/cheeses.service';

@Injectable({
  providedIn: 'root',
})
export class CheeseResolver implements Resolve<Cheese> {
  constructor(private service: CheesesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cheese> {
    if (route.params?.['id']) {
      console.log('Fetching cheese with ID:', route.params['id']);
      return this.service.loadById(route.params['id']);
    }
    return of({ _id: '', name: '', category: '' });
  }
}
