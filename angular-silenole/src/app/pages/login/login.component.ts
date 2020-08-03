// COMPONENTE
import { Component, OnInit, TemplateRef, } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* import { validarQueSeanIguales } from '../../shared/notificacion'; */
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// MODELOS
import { Usuario } from './../../models/usuario';
// SERVICIOS
import { UsuarioService } from 'src/app/shared/usuario.service';
import { LoginService } from './../../shared/login.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public modalRef: BsModalRef;
  public usuario=new Usuario(null,null,null,null,null,null,null,null,null)
  public usuario2=new Usuario(null,null,null,null,null,null,null,null,null)
  email: string;
  password: string; 
  password2: string; 
  form: FormGroup;
  // public equals=false
  closeResult = '';
  title = 'toaster-not'
  notifyService: any;

  constructor(private router:Router,public loginService:LoginService, public usuarioService:UsuarioService,
      public productService:ProductService, public modalService:BsModalService, 
      private http: HttpClient,private fb: FormBuilder , private modalService2: NgbModal) { 
    console.log("Funcionando servicio usuario")
    this.usuario
  }
    
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      'password':  ['', Validators.required],
      'confirmarPassword': ['', Validators.required]
    }, {
     /*  validators: validarQueSeanIguales */
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

   registrarUsuario(user_id:number, name:string, password:string, password2:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    // this.compararPassword(password,password2)
    if(password===password2){
      console.log("Contraseña correcta")
      this.newUsuario(name, password, email, comunidad, provincia, localidad, cp)
      this.modalRef.hide()
    }else{
     console.log("abrirModalError")
      // this.equals=true
    }
   }
   
  newUsuario(name:string, password:string,  email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    console.log(this.usuarioService.usuario)
    const pass1 = (<HTMLInputElement> document.getElementById ("pass1")).value
    const pass2 = (<HTMLInputElement> document.getElementById ("pass2")).value
    const nombre = (<HTMLInputElement> document.getElementById ("nombre")).value
    if (pass1 === pass2 && nombre !== "") {
      this.showToasterSuccess();
      this.usuarioService.newUsuario(new Usuario(null,name, password, email, comunidad, provincia, localidad, cp,null)).subscribe((data)=>{
        console.log(data)
      })
    }else{
      this.showToasterError();
    }
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Registrado con Exito", "Bienvenido a SileNole")
  }
  showToasterError(){
    this.notifyService.showError("Las contraseñas no coinciden", "")
  }
  showToasterInfo(){
    this.notifyService.showInfo("Registrado con Exito", "")
  }

  /* newUsuario(user_id:number, name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    console.log('Usuario Añadido')
    console.log(this.usuarioService.usuario)
    this.usuarioService.newUsuario(new Usuario(user_id, name, password, email, comunidad, provincia, localidad, cp, "assets/img/perfil.jpg")).subscribe((data)=>{
      console.log(data)
    })
  } */

  /* compararPassword(p1,p2){
    if(p1===p2){
      console.log("Contraseña correcta")
      this.router.navigate(["/home"])
    }else{
    console.log("abrirModalError")
    this.equals=true
    }
  } */

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
        this.router.navigate(["/"])
      }
      /* if (data==undefined) {
        console.log("Usuario Inexistente")
        this.router.navigate(["/"])
      } else {
        this.router.navigate(["/home"])
      } */
    });
  }

  openUr(usuarioSubido) {
    this.modalService2.open(usuarioSubido, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
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