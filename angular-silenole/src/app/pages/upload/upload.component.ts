// COMPONENTE
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';  //para cargar la foto
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// MODELO
import { Product } from 'src/app/models/product';
import { Usuario } from 'src/app/models/usuario';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  public usuarioActual=new Usuario(null,null,null,null,null,null,null,null,null)
  public product= new Product(null,null,null,null,null,null,null)
  public products: any[];
  public idProducto: number
  public modalRef: BsModalRef;
  selectedFile: File; //para cargar la foto

  constructor(public productService:ProductService, public loginService:LoginService, public modalService:BsModalService, private http: HttpClient) {
    this.usuarioActual=this.loginService.usuarioActual
  }

  pasarIdProducto(numero){
    this.idProducto=numero
    console.log(this.idProducto)
  }
  
  onSubmit(form){
    console.log(form.value)
  }

  //para cargar la foto
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
  }
  anyadirSile(nombre: string, descripcion: string, categoria: string, user_id: number, product_image: string){
    console.log('Hola desde anyadir')
    console.log(this.productService.product)
    let date = new Date();
    let productImageUrl = this.productService.urlImg + this.selectedFile.name;
    const fd = new FormData()
    fd.append('product_image',this.selectedFile, this.selectedFile.name);
    this.productService.uploadImageProduct(fd).subscribe((data)=>{
      console.log(data)
    })
    this.productService.postProduct(new Product(null, nombre, descripcion, categoria, user_id, productImageUrl, date)).subscribe((data)=>{
      console.log(data)
    })
  }
  
  //PARA ABRIR EL MODAL NGX
  openModal(Upload: TemplateRef<any>){
    this.modalRef = this.modalService.show(Upload)
  }

  ngOnInit(): void {
  }

}
