import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from '../models/message';
import { Nole } from '../models/nole';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private url = "http://localhost:3000/"
  public message:Message

  public noleSeleccionado = new Nole(0, 0);
  public sileSeleccionado = new Nole(0, 0);
 
  constructor(private http:HttpClient) { }

// TERMINAR CUANDO ESTÉ EL SERVICIO USUARIO FUNCIONAL
  public getMessages(chat_id: string) {
    return this.http.get(this.url + "messages/" + chat_id)
  } //Devuelve la llamada al endpoint GET messages”

  public postMessage(nuevoMensaje: Message) {
    return this.http.post(this.url + "messages/", nuevoMensaje)
  } //Devuelve la llamada al endpoint POST “/" 

  postNole(newNoleRelation: Nole) {
    return this.http.post(this.url + "noles/", newNoleRelation)
  }

  getNolesByUser(id: number) {
    return this.http.get(this.url + "noles/" + id);
  }

  getSilesByUser(id: number) {
    return this.http.get(this.url + "siles/" + id);
  }

  deleteNole(chat_id: string) {
    return this.http.delete(this.url + "noles/" + chat_id);
  }
}