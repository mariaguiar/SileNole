// COMPONENTE
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// MODELO
import { Product } from 'src/app/models/product';
import { Usuario } from 'src/app/models/usuario';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  
  public product= new Product(null,null,null,null,null,null, null)
  public products: any;
  public form: FormGroup; // para obtener los datos del formulario
  public modalRef:BsModalRef
  public usuario: Usuario;  

  constructor(
    public productService: ProductService,
    public loginService: LoginService,
    public usuarioService: UsuarioService,
    private modalService: BsModalService,
    private router: Router,  
    private toastr: ToastrService) { }

  //METODOS
  public verificarUsuario(){
    let user_id = this.loginService.usuarioActual.user_id
    console.log(user_id)
    this.usuarioService.getUsuario(user_id).subscribe((data) => {
      console.log(data)
      this.router.navigate(["/usuario"]);
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.loginService.forcedLogout();
        this.productService.usuarioActual = null;
      }
    })
  }

  public buscarProducto(clave: string) {
    console.log(clave)
    this.productService.getProductsByName(clave).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    })
  }

  public cerrarSesion(){
    this.loginService.logout().subscribe((data) => {
      this.loginService.usuarioActual = null;
      this.productService.usuarioActual = null;
      console.log(data)
    });
  }

  //FORMULARIO
  public onSubmit(form) {
    console.log(form.value)
  }

  //MODAL
  public openModal(templateHeader: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(templateHeader)
  }
  
  ngOnInit(): void {}
  
}

