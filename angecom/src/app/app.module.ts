import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './pages/products/single-product/single-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/loginRegister/login/login.component';
import { RegisterComponent } from './pages/loginRegister/register/register.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';


//import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopbarComponent,
    HomeComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    UserAuthComponent,
    MyOrdersComponent,
    ContentPageComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
