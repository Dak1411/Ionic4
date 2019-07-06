import { MenuController } from '@ionic/angular';
import { AppModule } from '../app.module';

export function DisableSideMenu() {

    return function (constructor) {
        const originalDidEnter = constructor.prototype.ionViewDidEnter;
        const originalWillLeave = constructor.prototype.ionViewWillLeave;

        constructor.prototype.ionViewDidEnter = function () {

            // Get the MenuController instance
            const menuCtrl = AppModule.injector.get(MenuController);

            // Disable the side menu when entering in the page
            menuCtrl.enable(false);

            console.log('Disabling side menu...');

            // Call the ionViewDidEnter event defined in the page
            originalDidEnter && typeof originalDidEnter === 'function' && originalDidEnter.apply(this, arguments);
        };

        constructor.prototype.ionViewWillLeave = function () {

            // Get the MenuController instance
            const menuCtrl = AppModule.injector.get(MenuController);

            // Enable the side menu when leaving the page
            menuCtrl.enable(true);

            console.log('Enabling side menu...');

            // Call the ionViewWillLeave event defined in the page
            originalWillLeave && typeof originalWillLeave === 'function' && originalWillLeave.apply(this, arguments);
        };
    };

}
