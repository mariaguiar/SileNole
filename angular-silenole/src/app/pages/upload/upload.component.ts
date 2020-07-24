import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public product= new Product(null,null,null,null,null,null)
  public idProducto: number
  public idUsuario: number=1

  constructor(public productService:ProductService) { }

  
  pasarIdProducto(numero){
    this.idProducto=numero
    console.log(this.idProducto)
  }
  
  onSubmit(form){
    console.log(form.value)
  }

  anyadirSile(product_id: number, nombre: string, descripcion: string, categoria: string, user_id: number, product_image: string){
    console.log('Hola desde anyadir')
    console.log(this.productService.product)
    this.productService.postProduct(new Product(null, nombre, descripcion, categoria, user_id, product_image)).subscribe((data)=>{
      console.log(data)
    })
  }
  

  ngOnInit(): void {
  }

}
