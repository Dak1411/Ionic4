import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: [ './side-menu.component.scss' ],
})
export class SideMenuComponent implements OnInit {
  public static activePage = null;
  public appPages = [
    {
      title: 'View Posts',
      url: '/home/view-posts',
      icon: 'eye',
      color: 'primary'
    },
    {
      title: 'Add Posts',
      url: '/home/add-post',
      icon: 'add-circle-outline',
      color: 'primary'
    },
    {
      title: 'All Users',
      url: '/home/all-users',
      icon: 'contacts',
      color: 'primary'
    }
  ];
  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  public openPage(page) {
    SideMenuComponent.activePage = page.title;
    this.navCtrl.navigateBack(page.url);
  }
  public checkActivePage(page) {
    return SideMenuComponent.activePage === page.title;
  }

}
