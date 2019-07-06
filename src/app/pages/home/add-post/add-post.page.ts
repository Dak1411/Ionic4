import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddsService } from '../../../providers/adds.service';
import { ApplicationConstant } from '../../../utils/application-constants';
import { GenericService } from '../../../providers/generic.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: [ './add-post.page.scss' ],
})
export class AddPostPage implements OnInit {

  public addsForm: FormGroup;
  private loggedIn = null;
  public onSaveAttempt = false;
  public addsAttach = null;
  constructor(private navCtrl: NavController,
    private genericServices: GenericService,
    private formBuilder: FormBuilder,
    private addsService: AddsService,
    private camera: Camera) { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('userName');
    this.addsForm = this.createAddsForm();
  }

  private createAddsForm() {
    return this.formBuilder.group({
      subject: [ '' ],
      description: [ '' ],
      username: [ this.loggedIn ],
      image: [ null ]
    });
  }
  public goToDashboard() {
    this.navCtrl.navigateRoot([ 'home', 'dashboard' ]);
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
        this.addsAttach = ApplicationConstant.BASE64 + imageData;
        this.addsForm.get('image').setValue(this.addsAttach);
      }
    }).catch(() => {
      this.genericServices.dismissLoader();
    });
  }

  public submitPost() {
    this.onSaveAttempt = true;
    if (this.addsForm.valid) {
      this.genericServices.showLoader(ApplicationConstant.SUBMITTING_POST);
      this.addsService.submitAdd(this.addsForm.value).subscribe(respose => this.successCallBack(respose),
        error => this.errorCallBack(error));
    }
  }

  /**
   * API Call Backs
   * Do not writing any code afte the callback section
   */
  private successCallBack(response) {
    this.genericServices.dismissLoader();
    if (response) {
      this.genericServices.showToast(response.Message);
      if (response.Message === ApplicationConstant.POST_SUBMITTED) {
        setTimeout(() => {
          this.navCtrl.navigateRoot([ 'home', 'view-posts' ]);
        }, 100);
      }
    }
  }
  private errorCallBack(error) {
    this.genericServices.dismissLoader();
    this.genericServices.showToast(error.error);
  }
}
