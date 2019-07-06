import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, IonSlides } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { DisableSideMenu } from '../../../providers/disable-side-menu';
import { GenericService } from '../../../providers/generic.service';
import { AuthenticationService } from '../../../providers/authentication.service';
import { ApplicationConstant } from '../../../utils/application-constants';
import { FormValidatorsService } from '../../../providers/form-validators.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: [ './registration.page.scss' ],
})
@DisableSideMenu()
export class RegistrationPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  public registrationForm: FormGroup;
  public showPager = true;
  public studentImage;
  public locationList = [];
  public yearList = [];
  public securityQuestions = [];
  public onSaveAttempt = false;
  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private genericServices: GenericService,
    private camera: Camera,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.registrationForm = this.createRegistrationForm();
    this.locationList = ApplicationConstant.LOCATION_LIST;
    this.securityQuestions = ApplicationConstant.SECURITY_QUESTIONS;
    for (let year = new Date().getFullYear(); year >= 1990; year--) {
      this.yearList.push(year + ' - ' + (year + 3));
    }
  }

  private createRegistrationForm() {
    return this.formBuilder.group({
      phaseOne: this.formBuilder.group({
        name: [ '', [ FormValidatorsService.validateName ] ],
        email: [ '', [ FormValidatorsService.validateEmail ] ],
        phone: [ '', [ FormValidatorsService.validatePhone ] ],
        gender: [ '' ],
        isCreate: [ true ],
      }),
      phaseTwo: this.formBuilder.group({
        location: [ '' ],
        batch: [ '' ],
        department: [ ApplicationConstant.DEPARTMENT ],
        photo: [ null ],
      }),
      phaseThree: this.formBuilder.group({
        userName: [ '' ],
        password: [ '', [ Validators.required ] ],
        securityQuestion: [ '' ],
        securityAnswer: [ '' ],
        confirmPassword: [ '' ]
      })
    }, { validator: this.checkPasswords });
  }

  public addImage() {
    this.genericServices.presentActionSheet(this.openGallery, this.openCamera);
  }
  private openCamera = () => {
    this.selectPicture('camera');
  }
  private openGallery = () => {
    this.selectPicture('gallery');
  }

  private selectPicture(source) {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };
    this.genericServices.showLoader(ApplicationConstant.LOADING_IMAGE);
    this.camera.getPicture(cameraOptions).then((imageData) => {
      if (imageData && imageData !== undefined) {
        this.genericServices.dismissLoader();
        this.studentImage = 'data:image/jpeg;base64,' + imageData;
        this.registrationForm.get('phaseTwo').get('photo').setValue(this.studentImage);
      }
    }).catch(() => {
      this.genericServices.dismissLoader();
    });
  }
  public checkPasswords(group: FormGroup) {
    const password = group.get('phaseThree').get('password').value;
    const confirmPassword = group.get('phaseThree').get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordMissmatch: true };
  }
  public doRegistration() {
    this.onSaveAttempt = true;
    if (this.registrationForm.get('phaseOne').invalid) {
      this.slides.slideTo(0);
    } else if (this.registrationForm.get('phaseTwo').invalid) {
      this.slides.slideTo(1);
    } else if (this.registrationForm.get('phaseThree').invalid) {
      this.slides.slideTo(2);
    } else {
      this.genericServices.showLoader('Registering Student.');
      this.onSaveAttempt = false;
      this.authService.studentRegistration(this.registrationForm.value).
        subscribe(data => this.successCallBack(data), error => this.errorCallBack(error));
    }

  }

  /**
   * API Call Backs
   * Do not writing any code afte the callback section
   */
  private successCallBack(response) {
    this.genericServices.dismissLoader();
    if (response && response.Message === ApplicationConstant.SUCCESS_USER_CREATION) {
      this.genericServices.showToast(ApplicationConstant.SUCCESS_USER_CREATION);
    } else {
      this.genericServices.showToast(ApplicationConstant.FAILED_REGISTRATION);
    }
    setTimeout(() => {
      this.navCtrl.navigateBack([ 'user', 'landing' ]);
    }, 1000);
  }
  private errorCallBack(error) {
    this.genericServices.dismissLoader();
    this.genericServices.showToast(error.error);
  }
}
