import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsCollection {

  public static userDetails = [];
  public postDetails: any;
  constructor() { }

  public static setUserDetails(details) {
    if (details) {
      UserDetailsCollection.userDetails.push(details);
    } else {
      UserDetailsCollection.userDetails = [];
    }
  }
  public static getUserDetails() {
    return UserDetailsCollection.userDetails;
  }
  public setPostDetails(post) {
    this.postDetails = post;
  }
  public getPostDetails() {
    return this.postDetails;
  }
}
