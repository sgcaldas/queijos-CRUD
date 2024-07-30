import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheesesComponent } from './containers/cheeses/cheeses.component';
import { CheeseFormComponent } from './containers/cheese-form/cheese-form.component';

const routes: Routes = [
  { path: '', component: CheesesComponent},
  { path: 'new', component: CheeseFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheesesRoutingModule { }
