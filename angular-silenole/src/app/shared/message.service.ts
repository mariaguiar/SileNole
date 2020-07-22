import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = "http://localhost:3000/messages"
  public message:Message
 
  constructor(private http:HttpClient) { }

// TERMINAR CUANDO ESTÉ EL SERVICIO USUARIO FUNCIONAL
 public obtenerMensage(id:number,id2:number){
   return this.http.get(this.url + "/" + id + "/" + id2)
 }  //Devuelve la llamada al endpoint GET “/:user_id/:user_id2”
  
 public anyadirMessage(nuevoMensaje:Message){
  return this.http.post(this.url, nuevoMensaje)
 }  //Devuelve la llamada al endpoint POST “/" 

}