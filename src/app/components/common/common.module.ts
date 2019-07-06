import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { IonicModule } from '@ionic/angular';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [ UserComponent,
    SideMenuComponent ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ UserComponent,
    SideMenuComponent ]
})
export class CommonComponentModule { }
