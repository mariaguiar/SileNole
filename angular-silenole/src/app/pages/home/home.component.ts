// COMPONENTE
import { Component, OnInit } from '@angular/core';
// MODELOS
import { Product } from 'src/app/models/product';
import { Usuario } from './../../models/usuario';
import { Nole } from 'src/app/models/nole';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';
import { MessageService } from 'src/app/shared/message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public usuarioActual = new Usuario(null, null, null, null, null, null, null, null, null)
  public product= new Product(null,null,null,null,null,null,null)
  public productsUltimos: any;
  public productsCercanos: any;
  public idProducto: number

  constructor(public productService:ProductService, public loginService: LoginService, public messageService:MessageService) {
    this.mostrarUltimosProductos();
    this.mostraProductosCercanos();
  }

  mostrarUltimosProductos(){
    this.productService.getLatestProducts().subscribe((data) => {
      this.productsUltimos = data
      console.log(data)
    })
  }

  mostraProductosCercanos() {
    this.productService.getClosestProducts().subscribe((data) => {
      this.productsCercanos = data
      console.log(data)
    })
  }
  
  pasarIdOwner(oid) {
    this.productService.ownerActual = oid
    console.log(this.productService.ownerActual)
  }
  
  relacionarProductoMensaje(pid) {
    let uid = this.loginService.usuarioActual.user_id;
    this.productService.idProductoSeleccionado=pid;
    let newNole = new Nole(uid, pid);
    this.messageService.postNole(newNole).subscribe((data) => {
      //this.products = data
      console.log(data)
    })
    this.messageService.noleSeleccionado = newNole;
  }

  
  ngOnInit(): void { }

  
}

/*    mostrarProductosPorUsuario(uid){
    this.productService. getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  } */

/* PARA EL MODAL
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
closeResult = ''; //ATRIBUTO DE LA CLASE
private modalService: NgbModal // EN EL CONSTRUCTOR

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
  }*/