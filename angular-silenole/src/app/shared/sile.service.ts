/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Sile } from '../model/sile';

@Injectable({
  providedIn: 'root'
})
export class SileService {

  private url = "http://localhost:4200/"
  public sile:any
 
  constructor(private http:HttpClient) { }

 public obtenerUsuario(id:number){
   return this.http.get(this.url + "/usuario/"+ id)
 }  //Devuelve la llamada al endpoint GET “/usuario/:id”
 public obtenerSiles(id:number){
    return this.http.get(this.url + "/siles/"+ id)
  }  //Devuelve la llamada al endpoint GET “/siles/:id”
  
 public obtenerUltimos4(id:number){
  return this.http.get(this.url + "/buscar/" + id)
 }  //Devuelve la llamada al endpoint GET “/discos/:id” 
 public anyadirSile(nSile:Sile){
  return this.http.post(this.url, nSile)
 }  //Devuelve la llamada al endpoint POST “/discos” 
 public actualizarSile(nSile:Sile) {
   return this.http.put(this.url, nSile )
  } //Devuelve la llamada al endpoint PUT “/discos”.

 public borrarUsuario(id1:string,id2:string){
  let options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      email: id1,
      password: id2

    },
  };
  return this.http.delete(this.url + "/usuario/" + options)
 } //Devuelve la llamada al endpoint DELETE ”/user. 
} */