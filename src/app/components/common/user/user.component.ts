import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController, Events } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
})
export class UserComponent implements OnInit, OnDestroy {
  public studentDetails: any = {};
  constructor(private navCtrl: NavController,
    private menuCtrl: MenuController,
    private event: Events) {

  }

  ngOnInit() {
    this.event.subscribe('userDetails', details => {
      if (details) {
        this.studentDetails = details;
      }
    });
  }
  ngOnDestroy() {
    this.event.unsubscribe('userDetails');
  }
  public editUserProfile() {
    this.menuCtrl.close('side-menu');
    this.navCtrl.navigateForward('/home/edit-profile');
  }

}
