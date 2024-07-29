import { CheesesService } from './../services/cheeses.service';
import { Component, OnInit } from '@angular/core';
import { Cheese } from '../model/cheese';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cheeses',
  templateUrl: './cheeses.component.html',
  styleUrls: ['./cheeses.component.scss']
})
export class CheesesComponent implements OnInit{

  cheeses$: Observable<Cheese[]>;
  readonly displayedColumns = ['name', 'category'];

  constructor(private CheesesService: CheesesService) {
    this.cheeses$ = this.CheesesService.list();
  }

  ngOnInit(): void { }

}
