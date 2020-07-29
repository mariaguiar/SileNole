import { Component, OnInit, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ServService} from './../../serv.service'
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  collapsed = true;
  toggleCollapsed(): void {
  this.collapsed = !this.collapsed;
  }

  public product= new Product(null,null,null,null,null,null)
  public products: any;
  form: FormGroup;
  
  modalRef:BsModalRef

constructor(public productService:ProductService, public servicio:ServService, private modalService: BsModalService) { }

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

onSubmit(form){
  console.log(form.value)
}

buscarProducto(clave: string){
  console.log(clave)
  this.productService.getProductsByName(clave).subscribe((data)=>{
    this.productService.products = data
    console.log(data)
  })
}

/* mostrarProductosPorCategoria(){
  this.productService.categoriaSeleccionada="Todo";
  this.productService.getProductsBySelectedCategory().subscribe((data)=>{
    this.products = data
    console.log(data)
  })
} */
  ngOnInit(): void {
  }
  openModal(templateHeader: TemplateRef<any>){
    this.modalRef = this.modalService.show(templateHeader)
  }
  /* public aparecerF2(){
    this.servicio.aparecer=false
    console.log(this.servicio.aparecer)
    } */
}
