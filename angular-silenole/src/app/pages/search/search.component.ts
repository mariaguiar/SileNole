import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
