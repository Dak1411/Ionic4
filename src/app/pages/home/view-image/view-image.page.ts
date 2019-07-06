import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsCollection } from 'src/app/providers/user-details-collection.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: [ './view-image.page.scss' ],
})
export class ViewImagePage implements OnInit {

  public postAttachment = null;
  constructor(private userDetails: UserDetailsCollection) { }

  ngOnInit() {
    this.postAttachment = this.userDetails.getPostDetails().Image;
  }

}
