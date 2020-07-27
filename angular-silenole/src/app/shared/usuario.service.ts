import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from './../models/usuario';
import { login } from '../models/user.login';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;
  private url = "http://localhost:3000/user/register"
  constructor(private http: HttpClient) { }


  newUsuario(nuevoUsuario: Usuario){
    console.log(this.url)
    return this.http.post(this.url, nuevoUsuario)
  }
}

 