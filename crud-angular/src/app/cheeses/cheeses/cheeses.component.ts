import { Component } from '@angular/core';
import { Cheese } from '../model/cheese';

@Component({
  selector: 'app-cheeses',
  templateUrl: './cheeses.component.html',
  styleUrl: './cheeses.component.scss'
})
export class CheesesComponent {

  cheeses: Cheese[] = [
    {_id: "1", name: "Emmental", category: "Meia-Cura"}
  ];

  readonly displayedColumns = ['name', 'category'];

  constructor() {

  }

  ngOnInit(): void { }

}
