  
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from './../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario: Usuario;
  private url = "http://localhost:3000/user/register"
  private urls = "http://localhost:3000/user"
  constructor(private http: HttpClient) { }
  public autentificado:boolean = false

  
  newUsuario(nuevoUsuario: Usuario){
    console.log(this.url)
    return this.http.post(this.url, nuevoUsuario)
  }
}
