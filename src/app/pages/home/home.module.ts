import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { UserInformationService } from '../../providers/user-information.service';
import { AddsService } from '../../providers/adds.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [ UserInformationService, AddsService ]
})
export class HomeModule { }
