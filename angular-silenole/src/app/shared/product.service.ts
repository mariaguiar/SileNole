import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nole } from '../models/nole';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product: any
  public products: any;
  public idUsuario: number;
  public ownerActual: number
  public categoriaSeleccionada: any; 
  public idProductoSeleccionado: number;
  
  private url = "http://localhost:3000/"  

  constructor(private http: HttpClient, public loginService:LoginService) {
    console.log("funcionando servicio product");
    this.idUsuario=this.loginService.usuarioActual.user_id
  }

  actualizarCategoriaSeleccionada(newCat: any){
    this.categoriaSeleccionada = newCat;
    console.log(this.categoriaSeleccionada)
    this.getProductsBySelectedCategory();
  }

    obtenerProductos() {
    return this.products
  }

  getAllProducts() {
    return this.http.get(this.url+ "products/");
  }
  getProductsByUser(id: number) {
    return this.http.get(this.url + "products/" + id);
  }
  postProduct(newProduct: Product) {
    return this.http.post(this.url + "products/", newProduct)
  }

  putProduct(newProduct: Product) {
    console.log(newProduct);
    return this.http.put(this.url+ "products/", newProduct)
  }

  getProductsBySelectedCategory() {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar/" + this.categoriaSeleccionada + "?filterUser=" + this.idUsuario);
  }
  
  public deleteProduct(id:number){
  let options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      product_id: id
    },
  };
  return this.http.delete(this.url+ "products/", options)
  }

}