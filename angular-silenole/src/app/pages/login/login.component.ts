import { Component, OnInit, TemplateRef, } from '@angular/core';
import {ServService} from './../../serv.service'
import { Usuario } from './../../models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioService } from 'src/app/Shared/usuario.service';
import { HttpClient } from "@angular/common/http";
import { LoginService } from './../../shared/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public modalRef: BsModalRef;
 public usuario=new Usuario(null,null,null,null,null,null,null)
 email: string;
 password: string;

  constructor(public loginService:LoginService, public usuarioService:UsuarioService, public modalService:BsModalService, public servicio:ServService,private http: HttpClient) { 
    console.log("Funcionando servicio usuario")
    this.usuario
  }

  public isError = false;
 
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ////////SERVICIO APARECER 
  public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  }

  ngOnInit(){
    }

    newUsuario(name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
      console.log('Usuario Añadido')
      console.log(this.usuarioService.usuario)
      this.usuarioService.newUsuario(new Usuario(name, password, email, comunidad, provincia, localidad,cp)).subscribe((data)=>{
        console.log(data)
      })
    }
    onSubmit(form){
      console.log(form.value)
    }
   login() {
      const user = {email: this.email, password: this.password};
      this.loginService.login(user).subscribe( data => {
        console.log(data);
      });
    }
    
  /*
    onLogin(form: NgForm) {
      if (form.valid) {
        return this.loginService
          .loginuser(this.user.email, this.user.password)
          .subscribe(
          data => {
            this.loginService.setUser(data.user);
            const token = data.id;
            this.loginService.setToken(token);
            this.router.navigate(['/home']);
            location.reload();
            this.isError = false;
          },
          error => this.onIsError()
          );
      } else {
        this.onIsError();
      }
    }

onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
*/
}
