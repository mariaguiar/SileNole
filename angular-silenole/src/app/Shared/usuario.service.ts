import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from './../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;
  public usuarioService: UsuarioService;
  private url = "http://localhost:4200/usuario"
  constructor(private http: HttpClient) { }
  
  getUsuarios(id: number){
    if (!id){
      return this.http.get(this.url)
    }else{
      return this.http.get(this.url + "?id=" + id)
    }
  }

  postUsuario(nuevoUsuario: Usuario){
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