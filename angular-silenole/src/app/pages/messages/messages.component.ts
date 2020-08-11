// COMPONENTE
import { Component, OnInit, TemplateRef  } from '@angular/core';
// MODAL
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// MODELO
import { Message } from 'src/app/models/message';
import { Usuario } from 'src/app/models/usuario';
// SERVICIOS
import { MessageService } from 'src/app/shared/message.service';
import { ProductService } from 'src/app/shared/product.service';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { LoginService } from 'src/app/shared/login.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  closeResult = ''; //MODAL NG
  public message=new Message(null, null, null, null, null ,null)
  public message2=new Message(null, null, null, null, null ,null)
  public messagesNoles: any;
  public messagesSiles: any;
  public noles: any;
  public siles: any;
  public usuarioActual=new Usuario(null, null, null, null, null, null, null, null, null)
  public fecha = new Date();
  public products: any;
  public modalRef: BsModalRef;
  public chat_idParaBorrar: string;

  constructor(public usuarioService:UsuarioService, public messageService:MessageService, public productService:ProductService, 
    public loginService:LoginService, private modalService: NgbModal, public modalServices:BsModalService,) { 
    console.log("Funcionando servicio messageService")
    this.noles=[];
    this.siles=[];
    this.usuarioActual = this.loginService.usuarioActual;
    this.cargarNoles()
    this.cargarMensajesNoles()
    this.cargarSiles()
    this.cargarMensajesSiles()
  }
  onSubmit(form){
    console.log(form.value)
  }

  pasarIdOwner(oid) {
    this.productService.ownerActual = oid
    console.log(oid)
    console.log(this.productService.ownerActual)
  }

  pasarNole(nole){
    console.log("El chat seleccionado es: " + nole.chat_id);
    this.messageService.noleSeleccionado.chat_id = nole.chat_id;
    this.messageService.noleSeleccionado.product_id = nole.product_id;
    this.cargarMensajesNoles();
  }

  pasarNoleParaBorrar(chat_id){
    console.log("El chat seleccionado es: " + chat_id);
    this.chat_idParaBorrar = chat_id;
    // this.messageService.noleSeleccionado.chat_id = nole.hat_id;
    // this.messageService.noleSeleccionado.product_id = nole.product_id;
    this.cargarMensajesNoles();
  }

  pasarSile(sile){
    console.log("El chat seleccionado es: " + sile.chat_id);
    this.messageService.sileSeleccionado.chat_id = sile.chat_id;
    this.messageService.sileSeleccionado.product_id = sile.product_id;
    this.cargarMensajesSiles();
  }

  enviarMsgNoleSeleccionado(text:string){
    console.log('Hola desde enviarMsgNoleSeleccionado')
    console.log(text)
    let sender_id = this.loginService.usuarioActual.user_id;
    let chat_id = this.messageService.noleSeleccionado.chat_id
    let product_id = this.messageService.noleSeleccionado.product_id
    let date = new Date();
    //let newMessage = new Message(null, chat_id, sender_id,  product_id, text, date);
    //this.noles.push(newMessage);
    this.messageService.postMessage(new Message(null, chat_id, sender_id,  product_id, text, date)).subscribe((data)=>{
      console.log(data)
      this.cargarMensajesNoles();
    })
  }

  
  eliminarNole(){
    this.messageService.deleteNole(this.chat_idParaBorrar).subscribe((data)=>{
      // console.log(data)
      this.cargarNoles()
      this.cargarMensajesNoles()
      this.cargarSiles()
      this.cargarMensajesSiles()
    })
  }

  cargarNoles() {
    let uid=this.loginService.usuarioActual.user_id
    this.messageService.getNolesByUser(uid).subscribe((data)=>{
      this.noles = data
      console.log(data) 
    })
  }

  cargarMensajesNoles() {
    let chat_id = this.messageService.noleSeleccionado.chat_id
    this.messageService.getMessages(chat_id).subscribe((data)=>{
      this.messagesNoles = data
      this.messagesNoles.forEach(msg => {
        let date:Date = new Date();
        date.setTime(Date.parse(msg.date));
        msg.date = date.toLocaleString();
        //console.log(date);
        //console.log(msg);
      })
      console.log(data)  
    })
  }

    cargarSiles() {
      let uid=this.loginService.usuarioActual.user_id
      this.messageService.getSilesByUser(uid).subscribe((data)=>{
        this.siles = data
        console.log(data) 
      })
    }

    cargarMensajesSiles() {
      let chat_id = this.messageService.sileSeleccionado.chat_id
      this.messageService.getMessages(chat_id).subscribe((data)=>{
        this.messagesSiles = data
        this.messagesSiles.forEach(msg => {
          let date:Date = new Date();
          date.setTime(Date.parse(msg.date));
          msg.date = date.toLocaleString();
          //console.log(date);
          //console.log(msg);
        })
        console.log(data)  
      })
    }
  
    enviarMsgSileSeleccionado(text:string){
      console.log('Hola desde enviarMsgSileeSeleccionado')
      console.log(text)
      let sender_id = this.loginService.usuarioActual.user_id;
      let chat_id = this.messageService.sileSeleccionado.chat_id
      let product_id = this.messageService.sileSeleccionado.product_id
      let date = new Date();
      this.messageService.postMessage(new Message(null, chat_id, sender_id,  product_id, text, date)).subscribe((data)=>{
        console.log(data)
        this.cargarMensajesSiles();
      })
    }

    /* PARA ABRIR LOS MODALES NG*/
    openModalDeleteNole(modalBorrarNole) {
      this.modalService.open(modalBorrarNole, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `${this.getDismissReason(reason)}`;
      });
    }

    openModalDeleteSile(modalBorrarSile) {
      this.modalService.open(modalBorrarSile, {ariaLabelledBy: 'modalEliminarCuenta'}).result.then((result) => {
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

  //PARA ABRIR EL MODAL NGX
  openModal(Upload: TemplateRef<any>){
    this.modalRef = this.modalServices.show(Upload)
  }


  ngOnInit(): void {
  }

}