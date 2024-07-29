import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheesesComponent } from './cheeses/cheeses/cheeses.component';
//import { CheeseResolver } from './cheeses/guards/cheese.resolver';
//import { CheeseFormComponent } from './cheeses/containers/cheese-form/cheese-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cheeses' },
  {
    path: 'cheeses',
    loadChildren: () =>
      import('./cheeses/cheeses.module').then((m) => m.CheesesModule),
  }

  // { path: '', pathMatch: 'full', redirectTo: 'cheeses' },
  // {
  //   path: 'cheeses',
  //   loadChildren: () =>
  //     import('./cheeses/cheeses.module').then((m) => m.CheesesModule),
  //   //component: cheesesComponent,
  // },
  // {
  //   path: 'cheeses/new',
  //   loadChildren: () =>
  //     import('./cheeses/cheeses.module').then((m) => m.CheesesModule),
  //   component: CheeseFormComponent,
  // },
  // {
  //   path: 'cheeses/edit/:id',
  //   loadChildren: () =>
  //     import('./cheeses/cheeses.module').then((m) => m.CheesesModule),
  //   component: CheeseFormComponent,
  //   resolve: {
  //     cheese: CheeseResolver,
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
