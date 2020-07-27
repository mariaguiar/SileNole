import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
/* import {ServService} from './../../serv.service' */
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Usuario } from './../../models/usuario';
import { LoginService } from 'src/app/shared/login.service';
import { Nole } from 'src/app/models/nole';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)

  public product= new Product(null,null,null,null,null,null)
  public products: any;
  public idProducto: number;
  // public ownerActual: number
  public categoriaActual: any;
  
  closeResult = '';

  constructor(public productService:ProductService, public loginService:LoginService, private modalService: NgbModal) { 
    this.usuarioActual=this.loginService.usuarioActual
     this.categoriaActual = this.productService.categoriaSeleccionada;
     this.mostrarProductosPorCategoria();
  }

  //PARA ACTUALIZAR CATEGORIA
  getCategoriaActual(): void{
    this.productService.getCategoriaSelecionada()
      .subscribe(categoria => { 
        this.categoriaActual=categoria
        console.log("Categoria Actualizada")
        this.mostrarProductosPorCategoria();
      })
  }

  mostrarProductos(){
    this.productService.getAllProducts().subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }
  mostrarProductosPorUsuario(uid){
    this.productService.getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }
  mostrarProductosPorCategoria(){
    this.productService.getProductsBySelectedCategory().subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }
  
  pasarIdOwner(oid){
    this.productService.ownerActual=oid
    console.log(this.productService.ownerActual)
  }

  pasarIdProducto(pid){
    this.idProducto=pid
    console.log(this.idProducto)
  }
  
  relacionarProductoMensaje(pid){
    let uid=this.loginService.usuarioActual.user_id;
    let newNole= new Nole(uid,pid);
    this.productService.postNole(newNole).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }
    
  ngOnInit(): void {
    this.usuarioActual=this.loginService.usuarioActual
  }

  
}
