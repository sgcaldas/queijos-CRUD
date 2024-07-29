import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheesesRoutingModule } from './cheeses-routing.module';
import { CheesesComponent } from './cheeses/cheeses.component';

@NgModule({
  declarations: [CheesesComponent],
  imports: [CommonModule, CheesesRoutingModule, MatTableModule],
})
export class CheesesModule {}
