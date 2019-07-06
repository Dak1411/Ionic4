import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { UrlConstant } from '../utils/url-constants';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private httpUtils: HttpUtilsService) { }

  public fetchStudentDetails(username) {
    const url = UrlConstant.BASE_URL + UrlConstant.STUDENT_DETAILS + username;
    return this.httpUtils.doGet(url);
  }
  public updateStudentDetails(details) {
    const url = UrlConstant.BASE_URL + UrlConstant.STUDENT_REGISTRATION;
    return this.httpUtils.doPost(details, url);
  }
  public listAllStudents() {
    const url = UrlConstant.BASE_URL + UrlConstant.LIST_ALL;
    return this.httpUtils.doGet(url);
  }
  public listPendingUsers() {
    const url = UrlConstant.BASE_URL + UrlConstant.PENDING_USERS;
    return this.httpUtils.doGet(url);
  }
  public approveUser(userName, isApprove) {
    const req = {
      userName: userName,
      isApprove: isApprove
    };
    const url = UrlConstant.BASE_URL + UrlConstant.APPROVE_USER;
    return this.httpUtils.doPost(req, url);
  }
}
