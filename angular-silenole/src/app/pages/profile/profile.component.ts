// COMPONENTE
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// MODAL
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// MODELO
import { Usuario } from './../../models/usuario';
// SERVICIOS
import { UsuarioService } from 'src/app/shared/usuario.service';
import { LoginService } from 'src/app/shared/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public closeResult = '';
  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)
  public usuario=new Usuario(null,null,null,null,null,null,null,null,null)
  public usuario3=new Usuario(null,null,null,null,null,null,null,null,null)
  public equals=false
  public selectedFile: File; //para cargar la foto  

  constructor(
    public usuarioService:UsuarioService, 
    public loginService:LoginService, 
    private modalService: NgbModal, 
    private router: Router, 
    private toastr: ToastrService) { 
      this.usuarioActual=this.loginService.usuarioActual
      this.selectedFile = null;
  }

  // METODOS
  //para cargar la foto
  public onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
  }

  public registrarUsuario(user_id:number, name:string, password:string, password2:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    if(password === password2){
      console.log("Contraseña correcta")
      this.modificarUsuario(user_id, name, password, email, comunidad, provincia, localidad, cp)
      this.equals=false
    }else{
     console.log("abrirModalError")
     this.equals=true
     }
   }
  
  public modificarUsuario(idUsuario:number, name:string, password:string, email:string, comunidad:string, provincia:string, localidad:string, cp:number){
    console.log('Usuario Modificado')
    // let userImageName =  name + ".jpg";
    let userImageUrl;
    if(this.selectedFile === null) {
      userImageUrl = this.usuarioActual.user_image;
    } else {
      userImageUrl = this.usuarioService.urlImg + this.selectedFile.name;
    }
    let userUpdated = new Usuario(idUsuario, name, password, email, comunidad, provincia, localidad, cp, userImageUrl);  
    if(this.selectedFile === null) {
      this.usuarioService.putUsuario(userUpdated).subscribe((data)=>{
        console.log(data)
        this.loginService.usuarioActual = userUpdated;
        this.usuarioActual = userUpdated;
        console.log(this.usuarioActual);
        this.router.navigate(["/usuario"]);
      })
    } else {
      const fd = new FormData()
      fd.append('user_image',this.selectedFile, this.selectedFile.name);
      this.usuarioService.uploadImage(fd).subscribe((data)=>{
        console.log(data)
        this.usuarioService.putUsuario(userUpdated).subscribe((data)=>{
          console.log(data)
          this.loginService.usuarioActual = userUpdated;
          this.usuarioActual = userUpdated;
          console.log(this.usuarioActual);
          this.router.navigate(["/usuario"]);
          this.selectedFile = null;
        })
      })
    }
  }

  public borrarUsuario(id:number){
    console.log('Usuario Borrado')
    this.usuarioService.deleteUsuario(id).subscribe((data)=>{
      console.log(data)
      this.loginService.logout();
      this.usuarioActual = new Usuario(null,null,null,null,null,null,null,null,null);
      this.loginService.usuarioActual = this.usuarioActual;
      this.selectedFile = null;
      this.toastr.success("Esperamos que vuelvas pronto a SileNole", "Usuario eliminado con éxito")
      this.router.navigate(["/"]);
    })
  }
  
  // FORMULARIO
  onSubmit(form){
    console.log(form.value)
  }

  //MODALES
  public open3(content3) {
    this.modalService.open(content3, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  public openUm(usuarioSubido) {
    this.modalService.open(usuarioSubido, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
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

  ngOnInit(): void {
  }

}
