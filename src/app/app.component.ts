import { Component, QueryList, ViewChildren } from '@angular/core';

import {
  Platform, IonRouterOutlet
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { GenericService } from './providers/generic.service';
import { ApplicationConstant } from './utils/application-constants';
import { UserDetailsCollection } from './providers/user-details-collection.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private genericServices: GenericService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      this.validateUser();
      this.platform.backButton.subscribeWithPriority(0, async () => {
        if (this.genericServices.isLoading) {
          return;
        }
        if (this.router.isActive('/user/landing', true) && this.router.url === '/user/landing') {
          navigator[ 'app' ].exitApp();
        } else {
          const canGoBack = this.routerOutlets.toArray().filter(out => out.canGoBack());
          if (canGoBack.length > 0) {
            canGoBack[ 0 ].pop();
          } else {
            this.genericServices
              .presentAlertConfirm(null, ApplicationConstant.LOGOUT_TITLE, this.alertYesHandler, this.alertNoHandler, null);
          }
        }
      });
    });
  }
  private validateUser() {
    const userName = localStorage.getItem('userName');
    if (userName) {
      if (userName === ApplicationConstant.ADMIN) {
        this.router.navigate([ 'admin' ]);
      } else {
        this.router.navigate([ 'home', 'dashboard' ]);
      }
    } else {
      this.router.navigate([ 'user', 'landing' ]);
    }
  }

  /**
 * Alert Call Backs
 * Do not write anyting after the call back sections
 */

  private alertYesHandler = () => {
    localStorage.clear();
    UserDetailsCollection.setUserDetails(null);
    this.router.navigate([ 'user', 'landing' ]);
  }

  private alertNoHandler = () => {

  }
}
