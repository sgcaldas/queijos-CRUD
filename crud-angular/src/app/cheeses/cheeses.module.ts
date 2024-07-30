import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheesesRoutingModule } from './cheeses-routing.module';
import { CheesesComponent } from './containers/cheeses/cheeses.component';
import { SharedModule } from '../shared/shared.module';
import { CheeseFormComponent } from './containers/cheese-form/cheese-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheesesListComponent } from './components/cheeses-list/cheeses-list.component';

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
