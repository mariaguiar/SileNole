// COMPONENTE
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// MODELO
import { Product } from 'src/app/models/product';
// SERVICIOS
import { ProductService } from 'src/app/shared/product.service';
import { LoginService } from 'src/app/shared/login.service';
import { ToastrService } from 'ngx-toastr';


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
  public modalRef:BsModalRef; //MODAL NGX
  public selectedFile: File; //para cargar la foto

  constructor(
    public productService:ProductService, 
    public loginService:LoginService, 
    private modalService: NgbModal, 
    private modalServices: BsModalService,
    private router: Router, 
    private toastr: ToastrService) { 
    this.products = [];
    this.selectedFile = null;
    this.mostrarProductos(this.idUsuario=this.loginService.usuarioActual.user_id)
  }

  // METODOS
  public mostrarProductos(uid){
    this.productService.getProductsByUser(uid).subscribe((data)=>{
      this.products = data
      console.log(data)
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.toastr.error("Por favor, ingresa de nuevo", "Algo fue mal")
        this.loginService.logout();
        this.loginService.usuarioActual = null;
        this.productService.usuarioActual = null;
        this.router.navigate(["/"]);
      }
    })
  }

  public pasarIdProducto(pid){
    this.idProducto=pid
    console.log(this.idProducto)
  };

  public pasarProducto(p){
    this.productoActual=p
    console.log(this.productoActual)
  }

  //para cargar la foto
  public onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
  }

  /* PARA MODIFICAR PRODUCTOS */
  public modificarSile(product_id: number, nombre: string, descripcion: string, categoria: string, user_id: number){
    console.log('Hola desde modificarSile')
    let date = new Date();
    let productImageUrl;
    if(this.selectedFile === null) {
      productImageUrl = this.productoActual.product_image;
    } else {
      productImageUrl = this.productService.urlImg + this.selectedFile.name;
    }
    if(this.selectedFile === null) {
      this.productService.putProduct(new Product(product_id, nombre, descripcion, categoria, user_id, productImageUrl, date)).subscribe((data)=>{
        console.log(data)
        this.mostrarProductos(this.idUsuario)      
      })
    } else {
      const fd = new FormData()
      fd.append('product_image',this.selectedFile, this.selectedFile.name);
      this.productService.uploadImageProduct(fd).subscribe((data)=>{
        console.log(data)
        this.productService.putProduct(new Product(product_id, nombre, descripcion, categoria, user_id, productImageUrl, date)).subscribe((data)=>{
          console.log(data)
          this.selectedFile = null;
          this.mostrarProductos(this.idUsuario)      
        })
      })
    }
  }

  public cancelarCambio(): void {
    this.selectedFile = null;
    this.mostrarProductos(this.idUsuario)      
  }

  /* PARA BORRAR PRODUCTOS */
  public borrarSile(id: number){
    console.log('Hola desde borrarSile')
    this.productService.deleteProduct(id).subscribe((data)=>{
      console.log(data)
      this.mostrarProductos(this.idUsuario)
    })
  }

  //FORMULARIOS
  public onSubmit(form){
    console.log(form.value)
  }

  // MODALES
  /* PARA ABRIR LOS MODALES NG*/
  public openModalDeleteProduct(contentMDP) {
    this.modalService.open(contentMDP, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  public openModalModifyProduct(contentMMP) {
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

  ngOnInit(): void {
  }


}
