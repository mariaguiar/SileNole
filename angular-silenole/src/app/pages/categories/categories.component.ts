import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  public categoria: any;

  constructor(public productService:ProductService) { 
    
  }

  ngOnInit(): void {
  }

  pasarCategoria(categoria: string){
    this.productService.actualizarCategoriaSeleccionada(categoria);
    this.mostrarProductosPorCategoria()
  }

  mostrarProductosPorCategoria(){
    this.productService.getProductsBySelectedCategory().subscribe((data)=>{
      this.productService.products = data
      console.log(data)
    })
  }
}

