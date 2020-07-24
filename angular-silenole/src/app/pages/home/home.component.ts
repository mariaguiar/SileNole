import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  closeResult = '';
  public product= new Product(null,null,null,null,null,null)
  public products: any;
  public idProducto: number
  public idUsuario: number=1

  constructor(public productService:ProductService, public servicio:ServService,private modalService: NgbModal) {
    this.mostrarProductosPorUsuario(1)
   }
  
   mostrarProductosPorUsuario(uid){
    this.productService. getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }

  /* public aparecerF(){
  this.servicio.aparecer=true
  console.log(this.servicio.aparecer)
  } */

  ngOnInit(): void {
  }
  open(content3) {
    this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
export class NgbdCarouselBasic {
  constructor() 
  {} 
}
