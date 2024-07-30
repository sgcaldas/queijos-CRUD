import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cheese } from '../../model/cheese';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cheeses-list',
  templateUrl: './cheeses-list.component.html',
  styleUrls: ['./cheeses-list.component.scss'],
})
export class CheesesListComponent implements OnInit {
  @Input() cheeses: Cheese[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  //   @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(cheese: Cheese) {
    this.edit.emit(cheese);
  }

    //   onDelete(cheese: Cheese) {
  //     this.remove.emit(cheese);
  //   }
}
