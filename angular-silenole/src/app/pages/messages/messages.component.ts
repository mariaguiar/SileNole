import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Message } from 'src/app/model/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public message=new Message(null,null,null,null,null)

  constructor(public messageService:MessageService) { 
    console.log("Funcionando servicio messageService")
    this.message
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
  ngOnInit(): void {
  }

}
