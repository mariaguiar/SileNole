import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls : ['./pages.component.css']
})
export class NgbdCarouselBasic {
  images = [940, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}