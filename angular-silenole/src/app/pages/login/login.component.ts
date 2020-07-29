import { Component, OnInit, TemplateRef, } from '@angular/core';
import { ServService } from './../../serv.service'
import { Usuario } from './../../models/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { HttpClient } from "@angular/common/http";
import { LoginService } from './../../shared/login.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarQueSeanIguales } from '../../shared/app.validator';
import { ProductService } from 'src/app/shared/product.service';


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
  form: FormGroup;
  constructor(private router:Router,public loginService:LoginService, public usuarioService:UsuarioService,
      public productService:ProductService, public modalService:BsModalService, public servicio:ServService, 
      private http: HttpClient,private fb: FormBuilder) { 
    console.log("Funcionando servicio usuario")
    this.usuario
  }
  
  ////////SERVICIO APARECER 
  public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      'password':  ['', Validators.required],
      'confirmarPassword': ['', Validators.required]
    }, {
      validators: validarQueSeanIguales
    });
  }
  equals(): boolean {
    return this.form.hasError('noSonIguales') &&
      this.form.get('password').dirty &&
      this.form.get('confirmarPassword').dirty;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  newUsuario(user_id:number, name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    console.log('Usuario Añadido')
    console.log(this.usuarioService.usuario)
    this.usuarioService.newUsuario(new Usuario(user_id, name, password, email, comunidad, provincia, localidad, cp, "perfil.jpg")).subscribe((data)=>{
      console.log(data)
    })
  }

  onSubmit(form){
      console.log(form.value)
  }

  login() {
    const user = {
      email: this.email,
      password: this.password
    };

    console.log(user)
    this.loginService.login(user).subscribe(data => {
      console.log(data[0]);
      this.loginService.usuarioActual = data[0]
      this.productService.usuarioActual = data[0]
      console.log(this.loginService.usuarioActual)
      if (data != undefined) {
        this.router.navigate(["/home"])
      } else {
        console.log("Usuario Inexistente")
      }
    });
  }
  }