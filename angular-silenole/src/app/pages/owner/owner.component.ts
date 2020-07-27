import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { Nole } from 'src/app/models/nole';
import { LoginService } from 'src/app/shared/login.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  public productoActual= new Product(null,null,null,null,null,null)
  public products: any;
  public idProducto: number
  public idUsuario: number
  public nombreOwner: string

  constructor(public productService:ProductService, public usuarioService:UsuarioService,public loginService:LoginService, 
      public messageService:MessageService,) {

   }

  mostrarProductos(uid){
    this.productService.getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }
  obtenerOwnerName(uid){
    this.usuarioService.getUsuario(uid).subscribe((data)=>{
      this.nombreOwner = data[0].name
      console.log(data)
    })
  }
  relacionarProductoMensaje(pid){
    let uid=this.loginService.usuarioActual.user_id;
    let newNole= new Nole(uid,pid);
    this.messageService.postNole(newNole).subscribe((data)=>{
      //this.products = data
      console.log(data)
    })
    this.messageService.noleSeleccionado = newNole;
  }

  ngOnInit(): void {
    this.obtenerOwnerName(this.productService.ownerActual)
    this.mostrarProductos(this.productService.ownerActual)
  }

}
