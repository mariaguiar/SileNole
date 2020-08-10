// COMPONENTE
import { Component, OnInit, TemplateRef } from '@angular/core';
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// MODELO
import { Product } from 'src/app/models/product';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  closeResult = ''; //MODAL NG
  public productoActual= new Product(null,null,null,null,null,null,null)
  public products: any;
  public idProducto: number
  public idUsuario: number
  modalRef:BsModalRef; //MODAL NGX
  selectedFile: File; //para cargar la foto

  constructor(public productService:ProductService, public loginService:LoginService, private modalService: NgbModal, private modalServices: BsModalService) { 
    this.products = [];
    this.mostrarProductos(this.idUsuario=this.loginService.usuarioActual.user_id)
  }
  
  mostrarProductos(uid){
    this.productService.getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    })
  }

  pasarIdProducto(pid){
    this.idProducto=pid
    console.log(this.idProducto)
    }

  pasarProducto(p){
    this.productoActual=p
    console.log(this.productoActual)
    }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form.value)
  }
  //para cargar la foto
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
  }

  /* PARA MODIFICAR PRODUCTOS */
  modificarSile(product_id: number, nombre: string, descripcion: string, categoria: string, user_id: number){
    console.log('Hola desde modificarSile')
    let date = new Date();
    let productImageUrl = this.productService.urlImg + this.selectedFile.name;
    const fd = new FormData()
    fd.append('product_image',this.selectedFile, this.selectedFile.name);
    this.productService.uploadImageProduct(fd).subscribe((data)=>{
      console.log(data)
    })
    this.productService.putProduct(new Product(product_id, nombre, descripcion, categoria, user_id, productImageUrl, date)).subscribe((data)=>{
      console.log(data)
      this.mostrarProductos(this.idUsuario)      
    })
  }

  /* PARA BORRAR PRODUCTOS */
  borrarSile(id: number){
    console.log('Hola desde borrarSile')
    this.productService.deleteProduct(id).subscribe((data)=>{
      console.log(data)
      this.mostrarProductos(this.idUsuario)
    })
  }

  /* PARA ABRIR LOS MODALES NG*/
  openModalDeleteProduct(contentMDP) {
    this.modalService.open(contentMDP, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  openModalModifyProduct(contentMMP) {
    this.modalService.open(contentMMP, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }  else {
      return '';
    }
  }

  /* PARA ABRIR LOS MODALES NGX*/
  openModal(modificadoModal: TemplateRef<any>){
    this.modalRef = this.modalServices.show(modificadoModal)
  }
}
