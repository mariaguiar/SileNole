import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Usuario } from './../../models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  closeResult = '';
  public usuario=new Usuario(null,null,null,null,null,null,null)

  constructor(public usuarioService:UsuarioService, private modalService: NgbModal) { 
    this.usuario
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    console.log(form.value)
  }
  modificarUsuario(name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    console.log('Usuario Añadido')
    console.log(this.usuarioService.usuario)
    this.usuarioService.putUsuario(new Usuario(name, password, email, comunidad, provincia, localidad,cp)).subscribe((data)=>{
      console.log(data)
    })
  }

  open3(content3) {
    this.modalService.open(content3, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
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
  }
}
