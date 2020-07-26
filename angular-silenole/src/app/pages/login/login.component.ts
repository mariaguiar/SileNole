import { Component, OnInit, TemplateRef, } from '@angular/core';
import { ServService } from './../../serv.service'
import { Usuario } from './../../models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { HttpClient } from "@angular/common/http";
import { LoginService } from './../../shared/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public modalRef: BsModalRef;
  public usuario=new Usuario(null,null,null,null,null,null,null,null,null)
  email: string;
  password: string;  

  constructor(public loginService:LoginService, public usuarioService:UsuarioService, public modalService:BsModalService, public servicio:ServService, private http: HttpClient) { 
    console.log("Funcionando servicio usuario")
    this.usuario
  }
  
  ////////SERVICIO APARECER 
  public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  }

  ngOnInit(){ }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  newUsuario(user_id:number, name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number, user_image:string){
    console.log('Usuario Añadido')
    console.log(this.usuarioService.usuario)
    this.usuarioService.newUsuario(new Usuario(user_id, name, password, email, comunidad, provincia, localidad, cp, user_image)).subscribe((data)=>{
      console.log(data)
    })
  }

  onSubmit(form){
      console.log(form.value)
  }

  login() {
      const user = {email: this.email, password: this.password};
      console.log(user)
      this.loginService.login(user).subscribe( data => {
        console.log(data[0]);
        /* this.loginService.idUsuario=data[0].user_id */
        this.loginService.usuarioActual=data[0]
        /* this.loginService.actualizarUsuario(data[0]) */
        console.log(this.loginService.usuarioActual.cp)
      });
    }
  }