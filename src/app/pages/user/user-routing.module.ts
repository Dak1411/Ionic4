import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: './landing/landing.module#LandingPageModule'
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationPageModule'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
