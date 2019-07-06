import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { GenericService } from '../../../providers/generic.service';
import { ApplicationConstant } from '../../../utils/application-constants';
import { AddsService } from '../../../providers/adds.service';
import { UserDetailsCollection } from 'src/app/providers/user-details-collection.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.page.html',
  styleUrls: [ './view-posts.page.scss' ],
})
export class ViewPostsPage implements OnInit {
  public noPostMessage = null;
  public postCollection = [];
  constructor(private navCtrl: NavController,
    private genericServices: GenericService,
    private addsService: AddsService,
    private userDetails: UserDetailsCollection) { }


  ionViewDidEnter() {

  }

  ngOnInit() {
    this.fetchAllPosts(null);
  }
  doRefresh(event) {
    this.fetchAllPosts(event);
  }

  private fetchAllPosts(event) {
    this.genericServices.showLoader(ApplicationConstant.FETCHING_POST);
    this.addsService.viewAllAdds().subscribe(data => this.successCallBack(data, event),
      error => this.errorCallBack(error, event));
  }
  public goToDashboard() {
    this.navCtrl.navigateRoot([ 'home', 'dashboard' ]);
  }
  public editPost(post) {
    this.userDetails.setPostDetails(post);
    this.navCtrl.navigateForward([ 'home', 'edit-post' ]);
  }
  /**
   * API Call Backs
   * Do not writing any code afte the callback section
   */
  private successCallBack(response, event?) {
    this.genericServices.dismissLoader();
    if (event) {
      event.target.complete();
    }
    if (response && response.length > 0) {
      this.postCollection = response;
    } else {
      this.postCollection = [];
      this.noPostMessage = ApplicationConstant.NO_POST_FOUND;
    }
  }
  private errorCallBack(error, event) {
    if (event) {
      event.target.complete();
    }
    this.genericServices.dismissLoader();
    this.genericServices.showToast(error.error);
  }
}
