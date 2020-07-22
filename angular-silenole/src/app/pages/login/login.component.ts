import { Component, OnInit, } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public modalRef: BsModalRef;
  public usuario: Usuario;

  closeResult = '';

  constructor(public usuarioService:UsuarioService,public servicio:ServService,private modalService: NgbModal) {
    console.log("Funcionando servicio usuario")
    this.usuario
   }

   onSubmit(form){
    console.log(form.value)
  }

  public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  }

  ngOnInit(): void {
  }
  /* open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
  open2(content2) {
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title2'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }  else {
      return '';
    }
  } */
}
export class NgbdCarouselBasic {
  constructor() 
  {} 
}
