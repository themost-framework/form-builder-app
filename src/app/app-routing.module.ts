import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder/builder.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'builder'
  },
  {
    path: 'builder',
    pathMatch: 'full',
    component: BuilderComponent
  },
  {
    path: 'preview',
    pathMatch: 'full',
    component: BuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
