import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FileUploadOptions, FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(private httpClient: HttpClient,
    private fileTransfer: FileTransfer) { }

  /**
   * Http Post
   *
   */
  public doPost(request, url) {
    return this.httpClient.post(url, request).pipe(map(response => {
      return response;
    }));
  }

  /**
   * Http Get
   *
   */
  public doGet(url) {
    return this.httpClient.get(url).pipe(map(response => {
      return response;
    }));
  }

}
