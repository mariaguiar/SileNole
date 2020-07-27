import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public message=new Message(null,null,null,null,null)
  
  public message1: Message

  constructor(public messageService:MessageService) { 
    console.log("Funcionando servicio messageService")
    this.message1= new Message(null,null,null,'',null)
  }
  onSubmit(form){
    console.log(form.value)
  }

  anyadir(message_id:number, user_id:number, chat_id:number, text:string, date:Date){
    console.log('Hola desde anyadir')
    console.log(this.messageService.message)
    this.messageService.anyadirMessage(new Message(null, user_id, chat_id, text, date)).subscribe((data)=>{
      console.log(data)
    })
  }

  enviarTexto(nuevoTexto: string){
    console.log(this.message.text);
    this.message1.text=nuevoTexto;
    console.log(this.message.text, "texto a imprimir");
  }

  ngOnInit(): void {
  }

}
