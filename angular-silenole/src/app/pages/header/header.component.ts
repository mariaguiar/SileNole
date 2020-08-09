// COMPONENTE
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// MODELO
import { Product } from 'src/app/models/product';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public product= new Product(null,null,null,null,null,null, null)
  public products: any;
  form: FormGroup; // para obtener los datos del formulario
  modalRef:BsModalRef

constructor(public productService:ProductService, private modalService: BsModalService, public loginService:LoginService) { }


  onSubmit(form) {
    console.log(form.value)
  }

  buscarProducto(clave: string) {
    console.log(clave)
    this.productService.getProductsByName(clave).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    })
  }

  cerrarSesion(){
    this.loginService.logout();
    this.loginService.usuarioActual = null;
    this.productService.usuarioActual = null;
    // todo limpiar todo
  }

  openModal(templateHeader: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(templateHeader)
  }
  
  ngOnInit(): void {}
  
}



/* mostrarProductos(uid){
  this.productService.getProductsByUser(uid).subscribe((data)=>{
    this.products = data
    console.log(data)
  })
}

mostrarTodosProductos(){
  this.productService.getAllProducts().subscribe((data)=>{
    this.products = data
    console.log(data)
  })
} */
/* mostrarProductosPorCategoria(){
  this.productService.categoriaSeleccionada="Todo";
  this.productService.getProductsBySelectedCategory().subscribe((data)=>{
    this.products = data
    console.log(data)
  })
} */