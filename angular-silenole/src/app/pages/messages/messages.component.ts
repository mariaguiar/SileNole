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
  public messages: any;
  public productoActual= new Product(null,null,null,null,null,null)
  public noles: any;
  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)
  // public message1: Message
  public fecha = new Date();

  constructor(public usuarioService:UsuarioService, public messageService:MessageService, public productService:ProductService, public loginService:LoginService) { 
    console.log("Funcionando servicio messageService")
    this.cargarNoles()
    // this.message1= new Message(null,null,null,'',null)
  }
  onSubmit(form){
    console.log(form.value)
  }

  pasarNole(nole){
    console.log("El chat seleccionado es: " + nole.chat_id);
    this.messageService.noleSeleccionado.chat_id = nole.chat_id;
    this.messageService.noleSeleccionado.product_id = nole.product_id;
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
  }

  cargarNoles() {
    let uid=this.loginService.usuarioActual.user_id
    this.productService.getNolesByUser(uid).subscribe((data)=>{
      this.noles = data
      console.log(data) 
    })
  }
  cargarMensajes() {
    /* let uid=this.loginService.usuarioActual.user_id
    this.productService.obtenerMensage(uid).subscribe((data)=>{
      this.products = data
      console.log(data)  
    })*/
  }

 /*  enviarTexto(nuevoTexto: string){
    console.log(this.message.text);
    this.message1.text=nuevoTexto;
    console.log(this.message.text, "texto a imprimir");
  } */

  ngOnInit(): void {
  }

}
