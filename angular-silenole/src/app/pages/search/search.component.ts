// COMPONENTE
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
// MODAL
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// MODELO
import { Product } from 'src/app/models/product';
import { Usuario } from './../../models/usuario';
import { Nole } from 'src/app/models/nole';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';
import { MessageService } from 'src/app/shared/message.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public usuarioActual = new Usuario(null, null, null, null, null, null, null, null, null)
  public product = new Product(null, null, null, null, null, null, null)
  public products: any;
  public idProducto: number;
  public categoriaActual: any;
  public usuario = new Usuario(null, null, null, null, null, null, null, null, null)

  closeResult = ''; //PARA EL MODAL

  constructor(private router:Router, public productService: ProductService, public loginService: LoginService, public messageService:MessageService, private modalService: NgbModal) {
    this.usuarioActual = this.loginService.usuarioActual;
  }

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
  
  buscarPorUbicacion(tipo: string, valor: any) {
    console.log("Buscar en ubicacion")
    this.productService.getProductsBySelectedCategoryAndLocation(tipo, valor).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    });
  }
  
  buscarPorDias(dias: number) {
    console.log("Buscar por dias")
    this.productService.getProductsBySelectedCategoryAndDays(dias).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    });
  }
  
  buscarUsuario(nombreUsuario){
    console.log("Buscar usuario ", nombreUsuario)
    this.productService.getOwnerByName(nombreUsuario).subscribe((data) => {
      this.productService.ownerActual = data[0].user_id;
      console.log(this.productService.ownerActual);
      this.router.navigate(["/owner"])
    });
  }
  
  pasarIdProducto(pid) {
    this.idProducto = pid
    console.log(this.idProducto)
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
  
  ngOnInit(): void {}
  
}


/*   buscarPorCp() {
    console.log("Buscar en el CP actual")
    this.productService.getProductsBySelectedCategoryAndCp(this.loginService.usuarioActual.cp).subscribe((data) => {
      this.productService.products = data
      console.log(data)
    });
  } */