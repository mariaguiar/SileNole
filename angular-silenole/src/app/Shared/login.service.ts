import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:3000/user"
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url + "/login", user);
  }
  getUserInfo(id:number){

    return this.http.get(this.url + `/${id}`).toPromise()
  }
/*
  loginuser(email: string, password: string): Observable<any> {
    const url_api = "http://localhost:3000/user/login";
    return this.http
      .post<login>(
        url_api,
        { email, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }
  setUser(user: login): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): login {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: login = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
*/
}