import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import {ProductsComponent} from './pages/products/products.component';
import {LoginComponent} from './pages/loginRegister/login/login.component';
import {SingleProductComponent} from './pages/products/single-product/single-product.component'; 
import {CartComponent} from './pages/cart/cart.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {SellerAuthComponent} from './pages/seller-auth/seller-auth.component';
import {SellerHomeComponent} from './pages/seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';

const routes: Routes = [
  { 
    path:'',
   component:HomeComponent
 },
  {path:'products',component:ProductsComponent},
  {path:'man',component:ProductsComponent},
  {path:'girls',component:ProductsComponent},
  {path:'best-seller',component:ProductsComponent},
  {path:'top-seller',component:ProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,canActivate:[AuthGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[AuthGuard]
  },
  { path:'my-orders',component:MyOrdersComponent},
  {path:'product/info/:productId',component:SingleProductComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'user-auth',component: UserAuthComponent},
  {path:'about-us',component: ContentPageComponent},
  {path:'contact-us',component: ContentPageComponent},
  {path:'privacy-policy',component: ContentPageComponent},
  {path:'how-it-work',component: ContentPageComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
