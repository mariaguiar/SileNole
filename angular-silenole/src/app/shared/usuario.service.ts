// SERVICIO
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
// MODELOS
import { Usuario } from './../models/usuario';
// SERVICIOS IMPORTADOS
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  public usuario: Usuario;
  public idUsuario: number;
  
  private url = "http://localhost:3000/"
  public urlImg = "http://localhost:3100/"

  
  constructor(private http: HttpClient,
    private router: Router, public loginService:LoginService ) { }


  public getUsuario(id: number){
    if (!id){
      return this.http.get(this.url + "user/register")
    }else{
      const accessToken = this.loginService.getToken();
      const user_id = this.loginService.usuarioActual.user_id.toString();
      const options = {
        headers: new HttpHeaders({
          'Authorization': accessToken, 
          'User': user_id, 
        })
      };
      return this.http.get(this.url + "user/" + id, options)
    }
  }

  public putUsuario(cambios: Usuario){
    const accessToken = this.loginService.getToken();
      const options = {
        headers: new HttpHeaders({
          'Authorization': accessToken,
        })
      };
    return this.http.put(this.url + "user", cambios, options)
  }
  
  public deleteUsuario(id: number){
    const accessToken = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'Content-Type': 'application/json',
      }),
      body: {
        user_id: id,
      },
    };
    return this.http.delete(this.url + "user/", options)
  }
  
  //Para la carga y borrar fotos
  public uploadImage(fd: FormData){
    return this.http.post(this.urlImg + "upload-img", fd)
  }

  public deleteImage(imageName: string){
    return this.http.delete(this.urlImg + "delete-img/" + imageName)
  }
  
}