import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  public product= new Product(null,null,null,null,null,null)
  public products: any;
  public categoria: any;

  constructor(public productService:ProductService) { 
    this.products=this.productService.products;
  }

  ngOnInit(): void {
  }

  pasarCategoria(categoria: string){
    this.productService.categoriaSeleccionada=categoria;
    console.log(this.productService.categoriaSeleccionada)
  }
}

