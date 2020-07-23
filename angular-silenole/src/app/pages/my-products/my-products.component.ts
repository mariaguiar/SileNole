import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  closeResult = '';
  public product= new Product(null,null,null,null,null,null)
  public products: any;
  public idProducto: number
  public idUsuario: number=1

  constructor(public productService:ProductService, private modalService: NgbModal) { 
    this.mostrarProductos(this.idUsuario)
  }
  
  mostrarProductos(uid){
    this.productService. getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }

  pasarIdProducto(pid){
    this.idProducto=pid
    console.log(this.idProducto)
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form.value)
  }
  /* PARA MODIFICAR PRODUCTOS */
  modificarSile(product_id: number, nombre: string, descripcion: string, categoria: string, user_id: number, product_image: string){
    console.log('Hola desde modificarSile')
    this.productService.putProduct(new Product(product_id, nombre, descripcion, categoria, user_id, product_image)).subscribe((data)=>{
      console.log(data)
    })
  }

  borrarSile(id: number){
    console.log('Hola desde borrarSile')
    this.productService.deleteProduct(id).subscribe((data)=>{
      console.log(data)
    })
  }
  /* PARA ABRIR LOS MODALES */
  openModalDeleteProduct(contentMDP) {
    this.modalService.open(contentMDP, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
  openModalModifyProduct(contentMMP) {
    this.modalService.open(contentMMP, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
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
