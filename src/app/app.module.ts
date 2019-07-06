import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { CommonComponentModule } from './components/common/common.module';
import { GenericService } from './providers/generic.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/authentication-interceptor.service';
import { AuthenticationService } from './providers/authentication.service';
import { HttpUtilsService } from './providers/http-utils.service';
import { FormValidatorsService } from './providers/form-validators.service';
import { UserDetailsCollection } from './providers/user-details-collection.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Network } from '@ionic-native/network/ngx';
@NgModule({
  declarations: [ AppComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    CommonComponentModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GenericService,
    Camera,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    AuthenticationService,
    HttpUtilsService,
    FormValidatorsService,
    UserDetailsCollection,
    FileTransfer,
    FileTransferObject,
    Network
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    // Make the injector to be available in the entire module
    AppModule.injector = injector;
  }
}
