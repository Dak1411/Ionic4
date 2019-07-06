import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { UrlConstant } from '../utils/url-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpUtils: HttpUtilsService) { }

  public studentRegistration(studentDetails) {

    /*const req = {
      fileKey: 'file',
      fileName: 'image.png',
      httpMethod: 'POST',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        name: studentDetails.phaseOne.name,
        username: studentDetails.phaseOne.email,
        password: studentDetails.phaseThree.password,
        isCreate: true,
        email: studentDetails.phaseOne.email,
        phone: studentDetails.phaseOne.phone,
        gender: studentDetails.phaseOne.gender,
        location: studentDetails.phaseTwo.location,
        department: studentDetails.phaseTwo.department,
        batch: studentDetails.phaseTwo.batch,
        // photo: studentDetails.phaseTwo.photo,
        securityQuestion: studentDetails.phaseThree.securityQuestion,
        securityAnswer: studentDetails.phaseThree.securityAnswer
      }
    };*/
    const req = {
      name: studentDetails.phaseOne.name,
      username: studentDetails.phaseOne.email,
      password: studentDetails.phaseThree.password,
      isCreate: true,
      email: studentDetails.phaseOne.email,
      phone: studentDetails.phaseOne.phone,
      gender: studentDetails.phaseOne.gender,
      location: studentDetails.phaseTwo.location,
      department: studentDetails.phaseTwo.department,
      batch: studentDetails.phaseTwo.batch,
      photo: studentDetails.phaseTwo.photo,
      securityQuestion: studentDetails.phaseThree.securityQuestion,
      securityAnswer: studentDetails.phaseThree.securityAnswer
    };
    const url = UrlConstant.BASE_URL + UrlConstant.STUDENT_REGISTRATION;
    return this.httpUtils.doPost(req, url);
    // return this.httpUtils.doUpload(url, studentDetails.phaseTwo.photo, req);
  }

  public studentLogin(loginRequest) {
    const url = UrlConstant.BASE_URL + UrlConstant.STUDENT_LOGIN;
    return this.httpUtils.doPost(loginRequest, url);
  }

}
