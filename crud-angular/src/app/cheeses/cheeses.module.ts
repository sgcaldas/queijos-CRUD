import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheesesRoutingModule } from './cheeses-routing.module';
import { CheesesComponent } from './cheeses/cheeses.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CheesesComponent],
  imports: [
    CommonModule,
    CheesesRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
})
export class CheesesModule {}
