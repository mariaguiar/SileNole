import { Component, OnInit, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ServService} from './../../serv.service'
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

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
  
  
modalRef:BsModalRef

constructor(public productService:ProductService, public servicio:ServService, private modalService: BsModalService) { }

mostrarProductos(uid){
  this.productService. getProductsByUser(uid).subscribe((data)=>{
    this.products = data
    console.log(data)
  })
}
  ngOnInit(): void {
  }
  openModal(templateHeader: TemplateRef<any>){
    this.modalRef = this.modalService.show(templateHeader)
  }
  public aparecerF2(){
    this.servicio.aparecer=false
    console.log(this.servicio.aparecer)
    }
}
