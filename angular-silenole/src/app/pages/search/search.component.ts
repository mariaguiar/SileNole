import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { Usuario } from './../../models/usuario';
import { LoginService } from 'src/app/shared/login.service';
import { Nole } from 'src/app/models/nole';
import { MessageService } from 'src/app/shared/message.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public usuarioActual = new Usuario(null, null, null, null, null, null, null, null, null)

  public product = new Product(null, null, null, null, null, null)
  public products: any;
  public idProducto: number;
  public categoriaActual: any;


  closeResult = '';

  constructor(public productService: ProductService, public loginService: LoginService, public messageService:MessageService, private modalService: NgbModal) {}

  mostrarProductos() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data
      console.log(data)
    })
  }

  mostrarProductosPorUsuario(uid) {
    this.productService.getProductsByUser(uid).subscribe((data) => {
      this.products = data
      console.log(data)
    })
  }

  pasarIdOwner(oid) {
    this.productService.ownerActual = oid
    console.log(this.productService.ownerActual)
  }

  pasarIdProducto(pid) {
    this.idProducto = pid
    console.log(this.idProducto)
  }

  relacionarProductoMensaje(pid) {
    let uid = this.loginService.usuarioActual.user_id;
    this.productService.idProductoSeleccionado=pid;
    let newNole = new Nole(uid, pid);
    this.productService.postNole(newNole).subscribe((data) => {
      this.products = data
      console.log(data)
    })
    this.messageService.noleSeleccionado = newNole;
  }

  ngOnInit(): void {}

}
