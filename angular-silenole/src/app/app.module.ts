import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ProductComponent } from './pages/product/product.component';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
//Modales ngx
import { ModalModule } from 'ngx-bootstrap/modal';

//servicios
import {ServService} from './serv.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UploadComponent,
    CategoriesComponent,
    LoginComponent,
    OwnerComponent,
    ProfileComponent,
    SearchComponent,
    MessagesComponent,
    MyProductsComponent,
    ProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,NgbCarouselModule, BrowserAnimationsModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [
    ServService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
