import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheesesRoutingModule } from './cheeses-routing.module';
import { CheesesComponent } from './cheeses/cheeses.component';

@NgModule({
  declarations: [CheesesComponent],
  imports: [CommonModule, CheesesRoutingModule, AppMaterialModule],
})
export class CheesesModule {}
