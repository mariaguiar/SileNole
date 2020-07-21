import { Component, OnInit, TemplateRef } from '@angular/core';
import {ServService} from './../../serv.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-product', 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

  modalRef:BsModalRef

  constructor(public servicio:ServService, private modalService: BsModalService ) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }


  public aparecerF(){
    this.servicio.aparecer=true
    console.log(this.servicio.aparecer)
    }

  ngOnInit(): void {
   
  }
  
   
}
