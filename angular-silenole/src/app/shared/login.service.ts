import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public idUsuario: number;
  
  private url = "http://localhost:3000/user"
  
  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url + "/login", user);
  }
}