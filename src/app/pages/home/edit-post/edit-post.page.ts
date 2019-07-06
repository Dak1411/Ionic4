import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { DisableSideMenu } from '../../../providers/disable-side-menu';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserDetailsCollection } from '../../../providers/user-details-collection.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: [ './edit-post.page.scss' ],
})
@DisableSideMenu()
export class EditPostPage implements OnInit {

  public editPost: any = {};
  public author = null;
  public currentUser = null;
  public allowEdit = false;
  constructor(private navCtrl: NavController,
    private routerParams: ActivatedRoute,
    private userDetails: UserDetailsCollection) { }

  ngOnInit() {
    this.currentUser = UserDetailsCollection.getUserDetails()[ 0 ].Name;
    this.editPost = this.userDetails.getPostDetails();
  }

  public goToDashboard() {
    this.navCtrl.navigateRoot('/home/dashboard');
  }
  public viewAttachment(attachment) {
    if (attachment) {
      this.navCtrl.navigateForward([ 'home', 'view-image' ]);
    }
  }
}

