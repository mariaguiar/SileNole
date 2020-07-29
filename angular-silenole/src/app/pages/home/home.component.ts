import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { Usuario } from './../../models/usuario';
import { LoginService } from 'src/app/shared/login.service';
import { Nole } from 'src/app/models/nole';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  closeResult = '';

  public usuarioActual = new Usuario(null, null, null, null, null, null, null, null, null)
  public product= new Product(null,null,null,null,null,null)
  public productsUltimos: any;
  public productsCercanos: any;
    public idProducto: number
  public idUsuario: number=1

  constructor(public productService:ProductService, public loginService: LoginService, public messageService:MessageService, private modalService: NgbModal) {
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

  }
  
/*    mostrarProductosPorUsuario(uid){
    this.productService. getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  } */

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
/* export class NgbdCarouselBasic {
  constructor() 
  {}  
}*/
