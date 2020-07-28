import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Message } from 'src/app/models/message';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Nole } from 'src/app/models/nole';
import { LoginService } from 'src/app/shared/login.service';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public message=new Message(null,null,null,null,null ,null)
  public messagesNoles: any;
  public messagesSiles: any;
  // public productoActual= new Product(null,null,null,null,null,null)
  public noles: any;
  public siles: any;
  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)
  // public message1: Message
  public fecha = new Date();

  constructor(public usuarioService:UsuarioService, public messageService:MessageService, public productService:ProductService, public loginService:LoginService) { 
    console.log("Funcionando servicio messageService")
    this.cargarNoles()
    this.cargarMensajesNoles()
    this.cargarSiles()
    this.cargarMensajesSiles()
  }
  onSubmit(form){
    console.log(form.value)
  }

  pasarNole(nole){
    console.log("El chat seleccionado es: " + nole.chat_id);
    this.messageService.noleSeleccionado.chat_id = nole.chat_id;
    this.messageService.noleSeleccionado.product_id = nole.product_id;
    this.cargarMensajesNoles();
  }

  pasarSile(sile){
    console.log("El chat seleccionado es: " + sile.chat_id);
    this.messageService.sileSeleccionado.chat_id = sile.chat_id;
    this.messageService.sileSeleccionado.product_id = sile.product_id;
    this.cargarMensajesSiles();
  }

  enviarMsgNoleSeleccionado(text:string){
    console.log('Hola desde enviarMsgNoleSeleccionado')
    console.log(text)
    let sender_id = this.loginService.usuarioActual.user_id;
    let chat_id = this.messageService.noleSeleccionado.chat_id
    let product_id = this.messageService.noleSeleccionado.product_id
    let date = new Date();
    this.messageService.postMessage(new Message(null, chat_id, sender_id,  product_id, text, date)).subscribe((data)=>{
    console.log(data)
    })
    this.cargarMensajesNoles();
  }

  cargarNoles() {
    let uid=this.loginService.usuarioActual.user_id
    this.messageService.getNolesByUser(uid).subscribe((data)=>{
      this.noles = data
      console.log(data) 
    })
  }

  cargarMensajesNoles() {
    let chat_id = this.messageService.noleSeleccionado.chat_id
    this.messageService.getMessages(chat_id).subscribe((data)=>{
      this.messagesNoles = data
      console.log(data)  
    })
  }

    cargarSiles() {
      let uid=this.loginService.usuarioActual.user_id
      this.messageService.getSilesByUser(uid).subscribe((data)=>{
        this.siles = data
        console.log(data) 
      })
    }

    cargarMensajesSiles() {
      let chat_id = this.messageService.sileSeleccionado.chat_id
      this.messageService.getMessages(chat_id).subscribe((data)=>{
        this.messagesSiles = data
        console.log(data)  
      })
    }
  
    enviarMsgSileSeleccionado(text:string){
      console.log('Hola desde enviarMsgSileeSeleccionado')
      console.log(text)
      let sender_id = this.loginService.usuarioActual.user_id;
      let chat_id = this.messageService.sileSeleccionado.chat_id
      let product_id = this.messageService.sileSeleccionado.product_id
      let date = new Date();
      this.messageService.postMessage(new Message(null, chat_id, sender_id,  product_id, text, date)).subscribe((data)=>{
      console.log(data)
      })
      this.cargarMensajesSiles();
    }


  ngOnInit(): void {
  }

}
