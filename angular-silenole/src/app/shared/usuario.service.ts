import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from './../models/usuario';
import { Observable } from 'rxjs';//para el token


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuario: Usuario;
  public idUsuario: number;
  
  private url = "http://localhost:3000/"
  public urlImg = "http://localhost:3100/"
  
  constructor(private http: HttpClient) { }

  //Para lo del token --------------------------------------------------------
  login(nuevoUsuario: Usuario): Observable<any> { 
    return this.http.post(this.url + "user/register", nuevoUsuario);
  } //------------------------------------------------------------------------

  public autentificado:boolean = false
  
  getUsuario(id: number){
    if (!id){
      return this.http.get(this.url + "user/register")
    }else{
      return this.http.get(this.url + "user/" + id)
    }
  }

  newUsuario(nuevoUsuario: Usuario){
    console.log(this.url)
    return this.http.post(this.url + "user/register", nuevoUsuario)
  }

  putUsuario(cambios: Usuario){
    return this.http.put(this.url + "user", cambios)
  }
  //para la prueba carga de fotos
  uploadImage(fd: FormData){
    return this.http.post(this.urlImg + "upload-img", fd)
  }

  deleteUsuario(id: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        user_id: id,
      },
    };
    return this.http.delete(this.url + "user/", options)
  }
  
}