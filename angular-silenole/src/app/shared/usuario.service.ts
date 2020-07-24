import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from './../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public idUsuario: number
  
  private url = "http://localhost:3000/user/register"
  
  constructor(private http: HttpClient) { }

  public autentificado:boolean = false
  
  getUsuario(id: number){
    if (!id){
      return this.http.get(this.url)
    }else{
      return this.http.get(this.url + "?id=" + id)
    }
  }
  newUsuario(nuevoUsuario: Usuario){
    console.log(this.url)
    return this.http.post(this.url, nuevoUsuario)
  }
  putUsuario(cambios: Usuario){
    return this.http.put(this.url, cambios)
  }
  deleteUsuario(id: number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.delete(this.url, options)
  }
}