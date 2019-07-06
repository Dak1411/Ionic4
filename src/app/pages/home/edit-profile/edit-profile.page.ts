import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GenericService } from '../../../providers/generic.service';
import { DisableSideMenu } from '../../../providers/disable-side-menu';
import { ApplicationConstant } from '../../../utils/application-constants';
import { UserDetailsCollection } from '../../../providers/user-details-collection.service';
import { FormValidatorsService } from '../../../providers/form-validators.service';
import { UserInformationService } from '../../../providers/user-information.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: [ './edit-profile.page.scss' ],
})
@DisableSideMenu()
export class EditProfilePage implements OnInit {
  public updateProfileForm: FormGroup;
  public locationList = [];
  public userDetails: any = {};
  public yearList = [];
  public onSaveAttempt = false;

  constructor(private genericServices: GenericService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private navCtrl: NavController,
    private studentServices: UserInformationService) { }

  ngOnInit() {
    this.userDetails = UserDetailsCollection.getUserDetails()[ 0 ];
    this.updateProfileForm = this.createUpdateForm();
    for (let year = new Date().getFullYear(); year >= 1990; year--) {
      this.yearList.push(year + ' - ' + (year + 3));
    }
    this.locationList = ApplicationConstant.LOCATION_LIST;
  }
  private createUpdateForm() {
    return this.formBuilder.group({
      name: [ this.userDetails.Name, [ FormValidatorsService.validateName ] ],
      phone: [ this.userDetails.Phone, [ FormValidatorsService.validatePhone ] ],
      email: [ this.userDetails.Email ],
      location: [ this.userDetails.Location ],
      batch: [ this.userDetails.Batch ],
      isCreate: [ false ],
      gender: [ this.userDetails.Gender ],
      photo: [ this.userDetails.Photo ],
      userName: [ this.userDetails.Email ],
      department: [ this.userDetails.Department ],
      securityQuestion: [ this.userDetails.SecurityQuestion ],
      securityAnswer: [ this.userDetails.SecurityAnswer ],
      password: [ '' ]

    });
  }
  public updateProfilePic() {
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
        this.userDetails.Photo = ApplicationConstant.BASE64 + imageData;
        this.updateProfileForm.get('photo').setValue(this.userDetails.Photo);
      }
    }).catch(() => {
      this.genericServices.dismissLoader();
    });
  }
  public updateProfile() {
    this.onSaveAttempt = true;
    if (this.updateProfileForm.valid) {
      this.genericServices.showLoader(ApplicationConstant.UPDATING_USER);
      this.studentServices.updateStudentDetails(this.updateProfileForm.value)
        .subscribe(response => this.successCallBack(response), error => this.errorCallBack(error));
    }
  }


  /**
  * API Call Backs
  * Do not writing any code afte the callback section
  */
  private successCallBack(response) {
    this.genericServices.dismissLoader();
    if (response.Message === ApplicationConstant.SUCCESS_USER_EDIT) {
      UserDetailsCollection.setUserDetails(null);
      this.genericServices.showToast(response.Message);
      this.navCtrl.navigateRoot('/home/dashboard');

    }
  }
  private errorCallBack(error) {
    this.genericServices.dismissLoader();
    this.genericServices.showToast(error.error);
  }
}

