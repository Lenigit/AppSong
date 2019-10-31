import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  observableUserId: Subject<any> = new Subject<any>();
  obsevableUserLogin: Subject<any> = new Subject<any>();
  obsevableUserPlaylists: Subject<any> = new Subject<any>();
  observableUserToken: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8083/";

  getApi = (lien) => {
    return this.http.get(this.baseUrl + lien);
  }

  postApi = (lien, data) => {
    return this.http.post(this.baseUrl + lien, data);
  }
  isLogged  = () => {
    let usertoken = JSON.parse(localStorage.getItem('token'));
    let userlogin = JSON.parse(localStorage.getItem('login'));
    let userid = JSON.parse(localStorage.getItem('id'));
    return this.http.post(this.baseUrl+"isLogged",{token: usertoken, login : userlogin, id:userid})
  }

}

