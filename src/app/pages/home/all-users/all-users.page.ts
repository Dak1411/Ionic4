import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/providers/generic.service';
import { ApplicationConstant } from 'src/app/utils/application-constants';
import { UserInformationService } from 'src/app/providers/user-information.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: [ './all-users.page.scss' ],
})
export class AllUsersPage implements OnInit {
  public allStudents = [];
  constructor(private genericServices: GenericService,
    private userServices: UserInformationService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.genericServices.showLoader(ApplicationConstant.FETCH_ALL_STUDENTS);
    this.userServices.listAllStudents().subscribe(studentList => this.successCallBack(studentList), error => this.errorCallBack(error));
  }
  public goToDashboard() {
    this.navCtrl.navigateRoot([ 'home', 'dashboard' ]);
  }


  /**
   * API Call Backs
   * Do not writing any code afte the callback section
   */
  private successCallBack(response) {
    if (response && response.length > 0) {
      this.allStudents = response;
      this.genericServices.dismissLoader();
    }
  }
  private errorCallBack(error) {
    this.genericServices.dismissLoader();
    this.allStudents = [];
    this.genericServices.showToast(error.error);
  }
}
