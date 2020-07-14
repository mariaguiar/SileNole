import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
