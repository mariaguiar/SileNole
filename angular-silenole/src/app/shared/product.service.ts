import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product: Product;
  public products: Product[];

  private url = "http://localhost:3000/siles"

 constructor(private http: HttpClient){}
 
getProduct(id: number)
{
  return this.http.get(this.url + "?id=" + id);
}
getProducts()
{
  return this.http.get(this.url);
}
postProduct(newProduct: Product)
{
  return this.http.post(this.url, newProduct)
}
putProduct(newProduct: Product)
{
  console.log(newProduct);
  return this.http.put(this.url, newProduct)
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
  return this.http.delete(this.url, options)
}

}