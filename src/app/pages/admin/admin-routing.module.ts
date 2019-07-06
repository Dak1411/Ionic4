import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-users',
    pathMatch: 'full'
  },
  {
    path: 'view-users',
    loadChildren: './view-users/view-users.module#ViewUsersPageModule'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
