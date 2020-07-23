import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
/* import {ServService} from './../../serv.service' */
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public product= new Product(null,null,null,null,null,null)
  public products: any;
  public idProducto: number
  public idUsuario: number=1
  /* collapsed = true;
  toggleCollapsed(): void {
  this.collapsed = !this.collapsed;
    
  } */

  closeResult = '';

  constructor(public productService:ProductService, private modalService: NgbModal) { 
    this.mostrarProductosPorUsuario(this.idUsuario)
  }
  
  mostrarProductosPorUsuario(uid){
    this.productService. getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }
  mostrarProductos(){
    this.productService.getProducts().subscribe((data)=>{
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
    open(content4) {
      this.modalService.open(content4, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
/* public aparecerF(){
    this.servicio.aparecer=true
    console.log(this.servicio.aparecer)
    } */