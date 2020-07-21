import { Component, OnInit, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ServService} from './../../serv.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  collapsed = true;
  toggleCollapsed(): void {
  this.collapsed = !this.collapsed;
    
  }

  modalRef:BsModalRef

    constructor(public servicio:ServService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModal(templateHeader: TemplateRef<any>){
    this.modalRef = this.modalService.show(templateHeader)
  }
  public aparecerF2(){
    this.servicio.aparecer=false
    console.log(this.servicio.aparecer)
    }
}
