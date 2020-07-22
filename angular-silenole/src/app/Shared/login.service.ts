import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { login } from '../models/user.login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public usuario: login;
  private url = "http://localhost:3000/user/login"
  constructor(private http: HttpClient) { }


  loginUser(loginUser: login){
    console.log(this.url)
    return this.http.post(this.url, loginUser);
  }
}

 