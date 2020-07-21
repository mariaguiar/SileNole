import { Component, OnInit, TemplateRef, } from '@angular/core';
import {ServService} from './../../serv.service'
import { Usuario } from './../../models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  usuario: Usuario;

  closeResult = '';

  constructor(public servicio:ServService,private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }
  

  ////////SERVICIO APARECER 
  public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  }

  ngOnInit(){
    this.usuario = new Usuario();
  }

  onSubmit(){
    console.log('Formulario Enviado');
    console.log(this.usuario);
  }

  //////////FUNCIONES PARA QUE MODAL FUNCIONE
}
export class NgbdCarouselBasic {
  constructor() 
  {} 
}
