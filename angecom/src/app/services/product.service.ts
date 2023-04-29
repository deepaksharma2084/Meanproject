import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
   // console.log('service called');
    return this.http.post('https://bsaswm.com/reactdemo/api/ang-products-add', data);
  }

  productList() {
    return this.http.get<product[]>('https://bsaswm.com/reactdemo/api/ang-products');
  }
 
  allProducts(){
    return this.http.get<product[]>('https://bsaswm.com/reactdemo/api/ang-all-products');
  }

  productListSeller(sellerId:string) {
    return this.http.get<product[]>(`https://bsaswm.com/reactdemo/api/ang-products/seller/${sellerId}`);
  }

  deleteProduct(id: number) {
    return this.http.get(`https://bsaswm.com/reactdemo/api/ang-products/delete/${id}`);
  }
  
  getProduct(id: string) {
    return this.http.get<product> (`https://bsaswm.com/reactdemo/api/ang-product-info/${id}`);
  }

  updateProduct(product:product){
    return this.http.post<product[]>(`https://bsaswm.com/reactdemo/api/ang-product-info/update/${product.id}`,product);
  }

  trendyProducts()
  {
     return this.http.get<[]>(`https://bsaswm.com/reactdemo/api/ang-fetch-products`);

  }

  popularProducts()
  {
    return this.http.get<[]>(`https://bsaswm.com/reactdemo/api/ang-fetch-products-trendy`);
  }

  prelatedrProducts()
  {
    return this.http.get<[]>(`https://bsaswm.com/reactdemo/api/ang-fetch-products`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      localCart = localStorage.getItem('localCart');
      this.cartData.emit([data]);
      if(localCart)
      {
        cartData = JSON.parse(localCart);
      }

    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }


  removeItemFromCart(productId:number){

   // console.log('testt'+productId);
      let cartData =  localStorage.getItem('localCart');
      //console.log(cartData);

      if(cartData)
      {
        console.log('now test');
        let items:product[] = JSON.parse(cartData);
        //console.log(items);
        items = items.filter((item:product)=>productId!==item.id);
       // console.log(items);
        localStorage.setItem('localCart', JSON.stringify(items));
        this.cartData.emit(items );
      }
  }

  addTocart(cartData:cart)
  {
    //console.log('testttt');
    return this.http.post('https://bsaswm.com/reactdemo/api/save-in-cart', cartData);
  }

  getCartList(userId:number){
    return this.http.get<product[]>(`https://bsaswm.com/reactdemo/api/user-cart-iteams/`+userId,
    {observe:'response'}).subscribe((result)=>{
       console.log(result);
       if(result && result.body)
       {
       // console.log('mmmmmmmmmmmmmmmm');
         this.cartData.emit(result.body);
       }
        
    })
  }

  removeToCart(cartId:number)
  {
    //console.log('yes reached'); 
    return this.http.get('https://bsaswm.com/reactdemo/api/cart-iteam-delete/'+cartId);
 
  }

  currentCart()
  {
    let userStore = localStorage.getItem('user');
    let userData  = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('https://bsaswm.com/reactdemo/api/user-cart-iteams/'+userData.id)

  }

  orderNow(data:order)
  {
      return this.http.post('https://bsaswm.com/reactdemo/api/orders-save',data);
  }
 
   orderList(){
    let userStore = localStorage.getItem('user');
    let userData  = userStore && JSON.parse(userStore);
      return this.http.get<order[]>('https://bsaswm.com/reactdemo/api/user-order-list/'+userData.id);
   }

   deleteCartItems(cartId:number){

    return this.http.get('https://bsaswm.com/reactdemo/api/cart-iteam-delete/'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result)
      {
        this.cartData.emit([]);
      }

    }); 
   }

   cancelOrder(orderId:number){

      return this.http.get('https://bsaswm.com/reactdemo/api/cencel-order/'+orderId);
   }
   
   pageContent(currentRoute:string){
      return this.http.get('https://bsaswm.com/reactdemo/api/page-content/'+currentRoute);
   
   }

}
