import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../../../components/common/side-menu/side-menu.component';
import { NavController, Events } from '@ionic/angular';
import { GenericService } from '../../../providers/generic.service';
import { ApplicationConstant } from '../../../utils/application-constants';
import { UserInformationService } from '../../../providers/user-information.service';
import { UserDetailsCollection } from '../../../providers/user-details-collection.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: [ './dashboard.page.scss' ],
})
export class DashboardPage {

  public selectedSegment = null;
  public studentImage = null;
  public studentDetails: any = {};
  constructor(private navCtrl: NavController,
    private genericServices: GenericService,
    private userInfoService: UserInformationService,
    private userDetailsEvent: Events) { }


  ionViewDidEnter() {
    this.selectedSegment = ApplicationConstant.PERSONAL_SEGMENT;
    SideMenuComponent.activePage = null;
    if (UserDetailsCollection.getUserDetails().length === 0) {
      const username = localStorage.getItem('userName');
      this.genericServices.showLoader(ApplicationConstant.FETCH_STUDENT_DETAILS);
      this.userInfoService.fetchStudentDetails(username)
        .subscribe(details => this.successCallBack(details), error => this.errorCallBack(error));
    } else {
      this.studentDetails = UserDetailsCollection.getUserDetails()[ 0 ];
    }
  }

  public segmentChanged(ev) {
    this.selectedSegment = ev.detail.value;
  }

  public doLogOut() {
    this.genericServices.presentAlertConfirm(null, ApplicationConstant.LOGOUT_TITLE, this.alertYesHandler, this.alertNoHandler, null);
  }

  /**
   * Alert Call Backs
   * Do not write anyting after the call back sections
   */
  private successCallBack(response) {
    this.genericServices.dismissLoader();
    this.studentDetails = response;
    UserDetailsCollection.setUserDetails(this.studentDetails);
    this.userDetailsEvent.publish('userDetails', this.studentDetails);
  }
  private errorCallBack(error) {
    this.genericServices.dismissLoader();
    UserDetailsCollection.setUserDetails(null);
    this.studentDetails = {};
  }
  private alertYesHandler = () => {
    localStorage.clear();
    UserDetailsCollection.setUserDetails(null);
    this.navCtrl.navigateRoot([ 'user', 'landing' ]);
  }

  private alertNoHandler = () => {

  }
}
