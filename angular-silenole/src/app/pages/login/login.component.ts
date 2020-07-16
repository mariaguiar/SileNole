import { Component, OnInit, Input, HostListener } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
   @Input() modal: ModalComponent

  @HostListener('click')
  click() {
    this.modal.toggle();
  }

}
