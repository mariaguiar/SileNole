import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private backUrl = "http://localhost:3000";
  public defaultUserPicture = "http://localhost:3100/perfil.jpg";
  private token:string;
  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null, this.defaultUserPicture);
  
  constructor(private http: HttpClient) { }

/*   login(user: any): Observable<any> {
    return this.http.post(this.backUrl + "/user/login", user);
  } */

  login(user: any): Observable<any> {
    return this.http.post<any>(this.backUrl + "/user/login", user).pipe(tap(
        (res: any) => {
          if (res) {
            // guardar token
            this.saveToken(res[1].accessToken, res[1].expiresIn);
            // guardar user_id
            this.saveUserId(res[0].user_id);
          }
        })
      );
  }

  register(nuevoUsuario: Usuario){
    console.log(this.backUrl)
    return this.http.post(this.backUrl + "/user/register", nuevoUsuario)
  }
    
  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("USER_ID");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
  
  private saveUserId(userId: any): void {
    localStorage.setItem("USER_ID", userId);
  }

  getUserId(): any {
    return localStorage.getItem("USER_ID");
  }
}