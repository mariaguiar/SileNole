import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nole } from '../models/nole';

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

  constructor(private http: HttpClient) {
    console.log("funcionando servicio product");
    // this.categoriaSeleccionada = "Ropa";
  }

  actualizarCategoriaSeleccionada(newCat: any){
    this.categoriaSeleccionada = newCat;
    console.log(this.categoriaSeleccionada)
    this.getProductsByCategory(this.categoriaSeleccionada)
  }

    obtenerProductos() {
    return this.products
  }

  getAllProducts() {
    return this.http.get(this.url+ "siles/");
  }
  getProductsByUser(id: number) {
    return this.http.get(this.url + "siles/" + id);
  }
  postProduct(newProduct: Product) {
    return this.http.post(this.url + "siles/", newProduct)
  }
  getNolesByUser(id: number) {
    return this.http.get(this.url + "noles/" + id);
  }
  postNole(newNoleRelation: Nole) {
     return this.http.post(this.url + "noles/", newNoleRelation)
  }
  putProduct(newProduct: Product) {
    console.log(newProduct);
    return this.http.put(this.url+ "siles/", newProduct)
  }

  getProductsBySelectedCategory() {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar/" + this.categoriaSeleccionada);
  }
  /* getProductsBySelectedCategory(categoria: string) {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar/" + categoria);
  } */

  getProductsByCategory(categoria: string) {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar/" + categoria);
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
  return this.http.delete(this.url+ "siles/", options)
  }

}