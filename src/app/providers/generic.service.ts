import { Injectable } from '@angular/core';
import { ToastController, AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
@Injectable()
export class GenericService {
    private toast: any;
    public isLoading = false;
    constructor(private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private actionSheetCtrl: ActionSheetController,
        private loadingController: LoadingController,
        private camera: Camera,
        private network: Network) { }

    public async showToast(message) {
        // if the toast instance is present then i dont want to create duplicate toast.
        if (this.toast) {
            return;
        }
        this.toast = await this.toastCtrl.create({
            message: message,
            duration: 2000,
            color: 'light'
        });
        this.toast.onDidDismiss().then(() => {
            this.toast = null;
        });
        this.toast.present();
    }

    // 2.Basic Alet
    public async presentAlert(alertMessage: any, subHead?) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
            subHeader: subHead || 'Subtitle',
            message: alertMessage,
            buttons: [ 'OK' ]
        });
        await alert.present();
    }

    // 3.Prompt
    public async presentAlertConfirm(title?, message?, yesHandler?, noHandler?, caller?) {
        const alert = await this.alertCtrl.create({
            header: title || 'Confirm!',
            message: message,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => noHandler(caller)
                }, {
                    text: 'Okay',
                    handler: () => yesHandler(caller)
                }
            ],
            mode: 'ios'
        });
        await alert.present();
    }

    // 4.Action Sheet
    public async presentActionSheet(openGallery, openCamera) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Albums',
            buttons: [ {
                text: 'Choose From Gallery',
                icon: 'image',
                handler: () => openGallery()
            }, {
                text: 'Open Camera',
                icon: 'Camera',
                handler: () => openCamera()
            } ],
            mode: 'ios'
        });
        await actionSheet.present();
    }
    // 5. Loaidng
    public async showLoader(message) {
        this.isLoading = true;
        return await this.loadingController.create({
            spinner: 'lines-small',
            message: message,
            translucent: true,
            mode: 'ios'
        }).then(loading => {
            loading.present().then(() => {
                if (!this.isLoading) {
                    loading.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });

    }
    public async dismissLoader() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }

    // 6.Check for online
    public isOnline() {
        if (this.network.type === this.network.Connection.NONE) {
            return false;
        } else {
            return true;
        }
    }
    public selectPicture(source) {
        const cameraOptions: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: source === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };

        return this.camera.getPicture(cameraOptions).then((imageData) => {
            if (imageData && imageData !== undefined) {
                console.log('Image from camera=>' + imageData);
                return 'data:image/jpeg;base64,' + imageData;
            }
        }).catch(() => {
            console.log('captured:Errror');
        });
    }
}

