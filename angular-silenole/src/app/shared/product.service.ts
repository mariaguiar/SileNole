import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nole } from '../models/nole';
import { LoginService } from './login.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product: any
  public products: any;
  public usuarioActual: Usuario;
  public ownerActual: number
  public categoriaSeleccionada: any; 
  public idProductoSeleccionado: number;
  
  private url = "http://localhost:3000/"  

  constructor(private http: HttpClient, public loginService:LoginService) {
    console.log("funcionando servicio product");
    this.usuarioActual=this.loginService.usuarioActual
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
    return this.http.get(this.url + "buscar/" + this.categoriaSeleccionada + "?filterUser=" + this.usuarioActual.user_id);
  }

  getLatestProducts(){
    console.log("obteniendo últimos productos")
    console.log(this.usuarioActual.user_id)
    return this.http.get(this.url + "buscar-ultimos/" + "?filterUser=" + this.usuarioActual.user_id) 
  }
  
/*   getProductsBySelectedCategoryAndFilter(filter: String) {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar/" + this.categoriaSeleccionada + "?filterUser=" + this.usuarioActual.user_id + filter);
  } */

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