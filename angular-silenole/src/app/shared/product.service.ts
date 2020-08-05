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
  public urlImg = "http://localhost:3100/" 

  constructor(private http: HttpClient, public loginService:LoginService) {
    console.log("funcionando servicio product");
    console.log(this.loginService.usuarioActual)
    this.usuarioActual=this.loginService.usuarioActual
  }

  //para la prueba carga de fotos
  uploadImageProduct(fd: FormData){
    return this.http.post(this.urlImg + "upload-imgProduct", fd)
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

  getProductsByName(clave: string) {
    console.log("hola desde getProductsByName " + clave)
    return this.http.get(this.url + "buscar/?filterProductName=" + clave + "&filterUser=" + this.usuarioActual.user_id);
  }

  getProductsBySelectedCategory() {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar/" + this.categoriaSeleccionada + "?filterUser=" + this.usuarioActual.user_id);
  }
  
  getProductsBySelectedCategoryAndCp(cp: number) {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar-cercanos/categoria/" + this.categoriaSeleccionada + "/cp/" + cp + "?filterUser=" + this.usuarioActual.user_id);
  }

  getProductsBySelectedCategoryAndLocation(tipo_loc:string, valor_loc:any) {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar-cercanos/categoria/" + this.categoriaSeleccionada + "/" + tipo_loc + "/" + valor_loc + "?filterUser=" + this.usuarioActual.user_id);
  }

  getProductsBySelectedCategoryAndDays(dias: number) {
    console.log("hola desde product.service")
    return this.http.get(this.url + "buscar-ultimos/" + "?filterUser=" + this.usuarioActual.user_id + "&days=" + dias);
  }

  getLatestProducts(){
    console.log("obteniendo últimos productos")
    console.log(this.usuarioActual.user_id)
    return this.http.get(this.url + "buscar-ultimos/" + "?filterUser=" + this.usuarioActual.user_id) 
  }

  getClosestProducts(){
    console.log("obteniendo productos cercanos")
    console.log(this.usuarioActual)
    console.log(this.usuarioActual.user_id)
    console.log(this.usuarioActual.localidad)
    return this.http.get(this.url + "buscar-cercanos/" + "?filterUser=" + this.usuarioActual.user_id + "&filterWhere=" + this.usuarioActual.localidad) 
  }
  
  getOwnerByName(nombreUsuario: string) {
    console.log("obteniendo usuario por nombre")
    return this.http.get(this.url + "buscar/usuario/" + nombreUsuario);
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