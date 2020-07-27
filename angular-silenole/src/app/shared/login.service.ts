import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Usuario } from './../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:3000/user";
  public usuarioActual=new Usuario(null,null,null,null,null,null,null)
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }
  login(user: any): Observable<any> {
    return this.http.post(this.url + "/login", user);
  }
}