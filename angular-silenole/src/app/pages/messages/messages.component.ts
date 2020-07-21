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

  ngOnInit(): void {
  }

}
