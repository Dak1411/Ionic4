import { Injectable } from '@angular/core';
import { ApplicationConstant } from '../utils/application-constants';
import { UrlConstant } from '../utils/url-constants';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class AddsService {

  constructor(private httpUtils: HttpUtilsService) { }

  public viewAllAdds() {
    const url = UrlConstant.BASE_URL + UrlConstant.GET_ADD;
    return this.httpUtils.doGet(url);
  }
  public submitAdd(addDetails) {
    const url = UrlConstant.BASE_URL + UrlConstant.CREAT_ADD;
    return this.httpUtils.doPost(addDetails, url);
  }
}
