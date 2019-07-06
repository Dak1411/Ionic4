import { Component, OnInit } from '@angular/core';
import { DisableSideMenu } from 'src/app/providers/disable-side-menu';
import { GenericService } from 'src/app/providers/generic.service';
import { UserDetailsCollection } from 'src/app/providers/user-details-collection.service';
import { NavController } from '@ionic/angular';
import { ApplicationConstant } from 'src/app/utils/application-constants';
import { UserInformationService } from 'src/app/providers/user-information.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: [ './view-users.page.scss' ],
})
@DisableSideMenu()
export class ViewUsersPage implements OnInit {

  public pendingStudentsList = [];
  public noPendingUserMessage = null;
  constructor(private genericServices: GenericService,
    private navCtrl: NavController,
    private userInfoService: UserInformationService) { }

  ngOnInit() {
    this.fetchPendingUSerList(null);
  }

  public fetchPendingUSerList(event) {
    this.genericServices.showLoader(ApplicationConstant.FETCHING_PRNDING_FOR_APPROVAL);
    this.userInfoService.listPendingUsers().
      subscribe(list => this.successCallBack(list, event, ApplicationConstant.FETCHING_PRNDING_FOR_APPROVAL),
        error => this.errorCallBack(error, event, ApplicationConstant.FETCHING_PRNDING_FOR_APPROVAL));
  }
  public approveUser(user) {
    this.genericServices.showLoader(ApplicationConstant.GRAND_PERMISSION);
    this.userInfoService.approveUser(user, true).
      subscribe(isApproved => this.successCallBack(isApproved, null, ApplicationConstant.GRAND_PERMISSION),
        error => this.errorCallBack(error, null, ApplicationConstant.GRAND_PERMISSION));
  }
  public rejectUser(user) {
    this.genericServices.showLoader(ApplicationConstant.REMOVING_USER);
    this.userInfoService.approveUser(user, false).
      subscribe(rejected => this.successCallBack(rejected, null, ApplicationConstant.REMOVING_USER),
        error => this.errorCallBack(error, null, ApplicationConstant.REMOVING_USER));
  }
  public doLogOut() {
    this.genericServices.presentAlertConfirm(null, ApplicationConstant.LOGOUT_TITLE, this.alertYesHandler, this.alertNoHandler, null);
  }
  public doRefresh(event) {
    this.fetchPendingUSerList(event);
  }

  /**
   * Alert Call Back Section
   * Do not write anything after this section
   */
  private successCallBack(response, event, caller) {
    if (event) {
      event.target.complete();
    }
    this.genericServices.dismissLoader();
    if (caller === ApplicationConstant.FETCHING_PRNDING_FOR_APPROVAL) {
      if (response && response.length > 0) {
        this.pendingStudentsList = response;
        this.noPendingUserMessage = null;
      } else {
        this.pendingStudentsList = [];
        this.noPendingUserMessage = ApplicationConstant.NO_PENDING_USERS;
      }
    } else {
      this.genericServices.showToast(response.Message);
      setTimeout(() => {
        this.doRefresh(null);
      }, 1000);
    }

  }
  private errorCallBack(error, event, caller) {
    this.genericServices.dismissLoader();
    if (event) {
      event.target.complete();
    }
    if (caller === ApplicationConstant.FETCHING_PRNDING_FOR_APPROVAL) {
      this.pendingStudentsList = [];
    }
    this.genericServices.showToast(error.error);
  }
  private alertYesHandler = () => {
    localStorage.clear();
    UserDetailsCollection.setUserDetails(null);
    this.navCtrl.navigateRoot([ 'user', 'landing' ]);
  }

  private alertNoHandler = () => {

  }

}
