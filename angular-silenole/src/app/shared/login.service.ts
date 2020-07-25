import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)
  /* public idUsuario: number; 
  public email:string*/
  
  private url = "http://localhost:3000/user"
  
  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url + "/login", user);
  }
  
}