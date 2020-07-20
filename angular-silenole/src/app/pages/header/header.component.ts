import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  collapsed = true;
  toggleCollapsed(): void {
  this.collapsed = !this.collapsed;
    
  }

  closeResult = '';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open4(content4) {
    this.modalService.open(content4, {ariaLabelledBy: 'modalCerrarSesion'}).result.then((result) => {
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
