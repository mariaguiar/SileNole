import { Component, OnInit, TemplateRef, } from '@angular/core';
import {ServService} from './../../serv.service'
import { Usuario } from './../../models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioService } from 'src/app/Shared/usuario.service';
import { LoginService } from './../../Shared/login.service';
import { login } from './../../models/user.login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public modalRef: BsModalRef;
 public usuario=new Usuario(null,null,null,null,null,null,null)
 public userLog = new login(null,null)


  constructor(public loginService:LoginService, public usuarioService:UsuarioService, public modalService:BsModalService, public servicio:ServService) { 
    console.log("Funcionando servicio usuario")
    this.usuario
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ////////SERVICIO APARECER 
  public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  }

  /////////METODOS PARA REGISTRO
  ngOnInit(){
  }

  onSubmit(form){
    console.log(form.value)
  }
 
  newUsuario(name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    console.log('Usuario Añadido')
    console.log(this.usuarioService.usuario)
    this.usuarioService.newUsuario(new Usuario(name, password, email, comunidad, provincia, localidad,cp)).subscribe((data)=>{
      console.log(data)
    })
  }
}
