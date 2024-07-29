import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheesesComponent } from './cheeses/cheeses.component';

const routes: Routes = [
  { path: '', component: CheesesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheesesRoutingModule { }
