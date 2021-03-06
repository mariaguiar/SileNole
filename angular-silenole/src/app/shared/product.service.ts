// SERVICIO
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// MODELOS
import { Product } from '../models/product';
import { Usuario } from '../models/usuario';
// SERVICIOS IMPORTADOS
import { LoginService } from './login.service';


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


  constructor(private http: HttpClient, 
    public loginService:LoginService) {
    console.log("funcionando servicio product");
    this.usuarioActual=this.loginService.usuarioActual
  }


  //para la carga de fotos
  public uploadImageProduct(fd: FormData){
    return this.http.post(this.urlImg + "upload-imgProduct", fd)
  }

  public actualizarCategoriaSeleccionada(newCat: any){
    this.categoriaSeleccionada = newCat;
    console.log(this.categoriaSeleccionada)
    this.getProductsBySelectedCategory();
  }

  public obtenerProductos() {
    return this.products
  }

  public getAllProducts() {
    const accessToken = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken,
      })
    };
    return this.http.get(this.url+ "products/", options );
  }

  public getProductsByUser(id: number) {
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id, 
      })
    };
    return this.http.get(this.url + "products/" + id, options);
  }
  
  public postProduct(newProduct: Product) {
    const accessToken = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken,
      })
    };
    return this.http.post(this.url + "products/", newProduct, options)
  }

  public putProduct(newProduct: Product) {
    const accessToken = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken,
      })
    };
    console.log(newProduct);
    return this.http.put(this.url+ "products/", newProduct, options)
  }

  public getProductsByName(clave: string) {
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    console.log("hola desde getProductsByName " + clave)
    return this.http.get(this.url + "buscar/?filterProductName=" + clave + "&filterUser=" + this.usuarioActual.user_id, options);
  }

  public getProductsBySelectedCategory() {
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    return this.http.get(this.url + "buscar/" + this.categoriaSeleccionada + "?filterUser=" + this.usuarioActual.user_id, options);
  }
  
  public getProductsBySelectedCategoryAndCp(cp: number) {
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    return this.http.get(this.url + "buscar-cercanos/categoria/" + this.categoriaSeleccionada + "/cp/" + cp + "?filterUser=" + this.usuarioActual.user_id, options);
  }

  public getProductsBySelectedCategoryAndLocation(tipo_loc:string, valor_loc:any) {
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    return this.http.get(this.url + "buscar-cercanos/categoria/" + this.categoriaSeleccionada + "/" + tipo_loc + "/" + valor_loc + "?filterUser=" + this.usuarioActual.user_id, options);
  }

  public getProductsBySelectedCategoryAndDays(dias: number) {
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    return this.http.get(this.url + "buscar-ultimos/" + "?filterUser=" + this.usuarioActual.user_id + "&days=" + dias, options);
  }

  public getLatestProducts(){
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    console.log("obteniendo últimos productos")
    console.log(this.usuarioActual.user_id)
    return this.http.get(this.url + "buscar-ultimos/" + "?filterUser=" + this.usuarioActual.user_id, options) 
  }

  public getClosestProducts(){
    const accessToken = this.loginService.getToken();
    const user_id = this.loginService.usuarioActual.user_id.toString();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id,
      })
    };
    console.log("obteniendo productos cercanos")
    console.log(this.usuarioActual)
    console.log(this.usuarioActual.user_id)
    console.log(this.usuarioActual.localidad)
    return this.http.get(this.url + "buscar-cercanos/" + "?filterUser=" + this.usuarioActual.user_id + "&filterWhere=" + this.usuarioActual.localidad, options) 
  }
  
  public getOwnerByName(nombreUsuario: string) {
    const accessToken = this.loginService.getToken();
    let user_id = this.loginService.usuarioActual.user_id.toString();
    console.log(user_id)
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken, 
        'User': user_id, 
      })
    };
    return this.http.get(this.url + "buscar/usuario/" + nombreUsuario, options);
  }

  public deleteProduct(id:number){
    const accessToken = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Authorization': accessToken,
        'Content-Type': 'application/json',
      }),
      body: {
        product_id: id,
        user_id: this.usuarioActual.user_id
      },
    };
  return this.http.delete(this.url+ "products/", options)
  }

}