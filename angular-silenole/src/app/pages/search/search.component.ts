import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ServService} from './../../serv.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  
  collapsed = true;
  toggleCollapsed(): void {
  this.collapsed = !this.collapsed;
    
  }

  closeResult = '';

  constructor(public servicio:ServService,private modalService: NgbModal) { }
  
  public aparecerF(){
    this.servicio.aparecer=true
    console.log(this.servicio.aparecer)
    }
    
  
    ngOnInit(): void {
    }
    open(content4) {
      this.modalService.open(content4, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  

}
