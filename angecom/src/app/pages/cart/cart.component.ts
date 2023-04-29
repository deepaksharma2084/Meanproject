import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummery } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartData:cart[]|undefined;

  priceSummary:priceSummery={
    price:0,
    tax:0,
    total:0
  }

  constructor(private product:ProductService,private router:Router){

  }

  ngOnInit():void {
  
    let  usercrtitem  =  localStorage.getItem('localCart');
	if(usercrtitem)
	{
		this.router.navigate(['/user-auth']);
	 }

    this.getCurrentCart();
  }

 getCurrentCart()
 {
    //console.warn('Hiii');
  this.product.currentCart().subscribe((result)=>{
    //console.warn('Hello');
    this.cartData = result;
    let price  = 0;
    result.forEach((iteam)=>{
      if(iteam.quantity)
      {
         price = price+ (+iteam.price)* (+iteam.quantity);
      }
      
    })
    this.priceSummary.price = price;
    this.priceSummary.tax = 100;
    this.priceSummary.total = price+100;
    //console.log(price);
      if(!this.cartData.length)
      {
          this.router.navigate(['/']);
      }else{
        let  user  =  localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
      }

  })
 }


  removeFromCart(cartId:number|undefined)
  {

    cartId && this.product.removeToCart(cartId).subscribe((result)=>{
      if(result)
      {
         //console.log(result);
        //this.product.getCartList(userId); 
        //this.product.getCartList(userId); 
         this.getCurrentCart();
      }
    })

  }



}
