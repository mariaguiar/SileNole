import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product: any
  public products: any[];
  public idUsuario: number;

  private url = "http://localhost:3000/"
  

  constructor(private http: HttpClient) {
    console.log("funcionando servicio product")
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
    return this.http.post(this.url+ "siles/", newProduct)
  }
  putProduct(newProduct: Product) {
    console.log(newProduct);
    return this.http.put(this.url+ "siles/", newProduct)
  }
  getProductsCategoria(categoria: string) {
    console.log("hola desde servicio")
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