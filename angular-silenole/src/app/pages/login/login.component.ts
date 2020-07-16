import { Component, OnInit, } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open2(content2) {
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title2'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  


export class NgbdCarouselBasic {
  constructor() 
  {} 
}
