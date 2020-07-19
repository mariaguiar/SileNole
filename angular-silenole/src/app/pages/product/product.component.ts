import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'


@Component({
  selector: 'app-product', 
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {


  closeResult = '';

  constructor(public servicio:ServService,private modalService: NgbModal) { }

  public aparecerF(){
    this.servicio.aparecer=true
    console.log(this.servicio.aparecer)
    }

  ngOnInit(): void {
   
  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}
