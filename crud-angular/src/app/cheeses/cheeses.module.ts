import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheesesRoutingModule } from './cheeses-routing.module';
import { CheesesComponent } from './cheeses/cheeses.component';
import { SharedModule } from '../shared/shared.module';
import { CheeseFormComponent } from './cheese-form/cheese-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheesesComponent, CheeseFormComponent],
  imports: [
    CommonModule,
    CheesesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class CheesesModule {}
