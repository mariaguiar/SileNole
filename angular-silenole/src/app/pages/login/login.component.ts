// COMPONENTE
import { Component, OnInit, TemplateRef, } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* import { validarQueSeanIguales } from 'src/app/shared/notificacion'; */
import { ToastrService } from 'ngx-toastr';
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// MODELOS
import { Usuario } from 'src/app/models/usuario';
// SERVICIOS
import { UsuarioService } from 'src/app/shared/usuario.service';
import { LoginService } from 'src/app/shared/login.service';
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

  constructor(public loginService:LoginService, public usuarioService:UsuarioService,
      public productService:ProductService, public modalService:BsModalService, 
      private http: HttpClient, private fb: FormBuilder , private modalService2: NgbModal, private toastr: ToastrService,
      private router: Router){
    console.log("Funcionando servicio usuario")
    
    // check for existing session
    if (this.loginService.getToken() != null) {
      // ya existe session
      // cargar datos session usuario
      const user_id = this.loginService.getUserId();
      this.usuarioService.getUsuario(user_id).subscribe( data => {
        console.log(data);
        this.loginService.usuarioActual = data[0];
        this.productService.usuarioActual = data[0];
        this.router.navigate(["/home"]);
      })
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      'password':  ['', Validators.required],
      'confirmarPassword': ['', Validators.required]
    }, {
      /* validators: validarQueSeanIguales */
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

/*    registrarUsuario(user_id:number, name:string, password:string, password2:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    // this.compararPassword(password,password2)
    if(password === password2){
      console.log("Contraseña correcta")
      this.newUsuario(name, password, email, comunidad, provincia, localidad, cp)
      this.modalRef.hide()
      const user = {
        email: this.email,
        password: this.password
      };
    }else{
     console.log("abrirModalError")
      // this.equals=true
    }
   } */
   
  newUsuario(name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    // const pass1 = (<HTMLInputElement> document.getElementById ("pass1")).value
    const pass2 = (<HTMLInputElement> document.getElementById ("pass2")).value
    // const nombre = (<HTMLInputElement> document.getElementById ("nombre")).value
    console.log(name, password, pass2, email, comunidad, provincia, localidad, cp)
    if (name === null || password === null || email === null || comunidad === null ||
          provincia === null || cp === null ||
          name === "" || password === "" || email === "" || comunidad === "" ||
          provincia === "" || cp === 0 || password.length<3) {
            this.toastr.error("Por favor, revisa todos los campos", "Algo fue mal") 
    } else {
      if (password !== pass2) {
        this.toastr.error("Las contraseñas no coinciden", "Algo fue mal")
      } else {
        this.loginService.register(new Usuario(null,name, password, email, comunidad, provincia, localidad, cp, this.loginService.defaultUserPicture)).subscribe((data)=>{
          console.log(data)
          if (data === null) {
            this.toastr.error("No se registró correctamente, el email ya existe", "Algo fue mal")
          } else {
            this.toastr.success("Registrado con éxito", "Bienvenido a SileNole")
            this.modalRef.hide();  
          }
        })      
      }
    }

  }
  
/*   showSuccess(){
    // this.notifyService.showSuccess("Registrado con Exito", "Bienvenido a SileNole")
    this.toastr.success("Registrado con Exito", "Bienvenido a SileNole")
  }
  showError(){
    // this.notifyService.showSuccess("Registrado con Exito", "Bienvenido a SileNole")
    this.toastr.error("Algo fue Mal", "Usuario no Registrado")
  }

  showToasterError(){
    this.notifyService.showError("Las contraseñas no coinciden", "")
  }

  showToasterInfo(){
    this.notifyService.showInfo("Registrado con Exito", "")
  } */

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

  login(email1,password1) { 
    if (email1 === null || password1 === null ||
      email1 === "" || password1 === "") {
        this.toastr.error("Por favor, revisa todos los campos", "Algo fue mal");
      }
    const user = {
      email: email1,
      password: password1
    };
    console.log(user)
    this.loginService.login(user).subscribe(data => {
      console.log(data);
      if (data !== null) {
        this.loginService.usuarioActual = data[0];
        this.productService.usuarioActual = data[0];
        console.log(this.loginService.usuarioActual);
        this.modalRef.hide();
        this.router.navigate(["/home"])
      } else {
        console.log("Usuario Inexistente")
        this.toastr.error("El ususario o la contraseña no son válidos", "Algo fue mal");
        this.router.navigate(["/"])
      } 
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

  public random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
  };

  public token() {
    return this.random() + this.random(); // Para hacer el token más largo
  };

  public checkOpenSession(template: TemplateRef<any>) {
    // check for existing session
    if (this.loginService.getToken() != null) {
      // ya existe session
      // cargar datos session usuario
      const user_id = this.loginService.getUserId();
      this.usuarioService.getUsuario(user_id).subscribe( data => {
        console.log(data);
        this.loginService.usuarioActual = data[0];
        this.productService.usuarioActual = data[0];
        this.router.navigate(["/home"]);
      })
    } else {
      this.openModal(template);
    }
  }
  
}