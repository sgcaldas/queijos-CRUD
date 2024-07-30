import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheesesRoutingModule } from './cheeses-routing.module';
import { CheesesComponent } from './cheeses/cheeses.component';
import { SharedModule } from '../shared/shared.module';
import { CheeseFormComponent } from './cheese-form/cheese-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheesesListComponent } from './cheeses-list/cheeses-list.component';

@NgModule({
  declarations: [CheesesComponent, CheeseFormComponent, CheesesListComponent],
  imports: [
    CommonModule,
    CheesesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class CheesesModule {}
