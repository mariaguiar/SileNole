import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from './../models/usuario';


@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  public usuario: Usuario;
  public idUsuario: number;
  
  private url = "http://localhost:3000/"
  public urlImg = "http://localhost:3100/"

  
  constructor(private http: HttpClient) { }


  public getUsuario(id: number){
    if (!id){
      return this.http.get(this.url + "user/register")
    }else{
      return this.http.get(this.url + "user/" + id)
    }
  }

  public putUsuario(cambios: Usuario){
    return this.http.put(this.url + "user", cambios)
  }
  
  public deleteUsuario(id: number){
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
  
  //Para la carga de fotos
  public uploadImage(fd: FormData){
    return this.http.post(this.urlImg + "upload-img", fd)
  }
  
}