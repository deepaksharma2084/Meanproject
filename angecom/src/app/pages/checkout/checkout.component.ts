import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number|undefined;
  cartData:cart[]|undefined;
  orderMsg :string|undefined;

  constructor(private product:ProductService,private router:Router){

  }

  ngOnInit():void{

    this.product.currentCart().subscribe((result)=>{
      let price  = 0;
      this.cartData = result;
      result.forEach((iteam)=>{
        if(iteam.quantity)
        {
           price = price+ (+iteam.price)* (+iteam.quantity);
        }

      })
      this.totalPrice = price+100;
      //console.warn(this.totalPrice);
    })

  }

  orderNow(data:{email:string,address:string,contact:string})
  {
    //console.log(data);
    let  user  =  localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice)
    {
      let orderData : order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((iteam)=>{
          setTimeout(()=>{
            iteam.id &&  this.product.deleteCartItems(iteam.id);
          },5000)

      })

      this.product.orderNow(orderData).subscribe((result)=>{
        if(result)
        {
           this.orderMsg = 'your order has been placed ';
          //console.log(JSON.stringify(result)); 
          //console.log(JSON.parse(JSON.stringify(result)).email);   
          //alert('Order Placed');
          setTimeout(()=>{
            this.router.navigate(['my-orders']);
            this.orderMsg = undefined;
          },4000)
            
        }

      })
    }
  }

}
