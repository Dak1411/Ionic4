import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from '../../../providers/generic.service';
import { AuthenticationService } from '../../../providers/authentication.service';
import { FormValidatorsService } from '../../../providers/form-validators.service';
import { ApplicationConstant } from '../../../utils/application-constants';
import { DisableSideMenu } from '../../../providers/disable-side-menu';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: [ './landing.page.scss' ],
})
@DisableSideMenu()
export class LandingPage implements OnInit {

  public credentialsForm: FormGroup;
  public onSaveAttempt = false;
  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private genericServices: GenericService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.credentialsForm = this.createCredentialsForm();
  }

  private createCredentialsForm() {
    return this.formBuilder.group({
      userName: [ '', [ FormValidatorsService.validateEmail ] ],
      password: [ '', Validators.required ]
    });
  }
  public doLogin() {
    this.onSaveAttempt = true;
    if (this.credentialsForm.valid) {
      this.genericServices.showLoader(ApplicationConstant.AUTHENTICATING_USER);
      this.authService.studentLogin(this.credentialsForm.value).subscribe(response => this.successCallBack(response),
        error => this.errorCallBack(error));
    }
  }

  public doRegistrationNavigation() {
    this.onSaveAttempt = false;
    this.navCtrl.navigateForward([ 'user', 'registration' ]);
    this.credentialsForm.reset();
  }

  /**
   * API Call Backs
   * Do not writing any code afte the callback section
   */
  private successCallBack(response) {
    if (response) {
      if (response.IsValid) {
        localStorage.setItem('loggedIn', response.Name);
        localStorage.setItem('userName', response.Username);
        this.genericServices.showToast(response.Message);
        setTimeout(() => {
          this.genericServices.dismissLoader();
          if (response.UserRole === ApplicationConstant.ADMIN_ROLE) {
            this.navCtrl.navigateRoot([ '/admin' ]);
          } else {
            this.navCtrl.navigateRoot([ '/home' ]);
          }

        }, 1000);
      } else {
        this.genericServices.dismissLoader();
        this.genericServices.showToast(response.Message);
      }
    }
  }
  private errorCallBack(error) {
    this.genericServices.dismissLoader();
    this.genericServices.showToast(error.error);
  }
}
