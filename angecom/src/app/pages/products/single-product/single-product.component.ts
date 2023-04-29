import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent{
 
  productData:undefined|product;
  relatedProducts :undefined|product[];
  productQuantity:number=1;
  removeCart = false;
  cartData:product|undefined;

  constructor(private activateRoute:ActivatedRoute,private product:ProductService){}

  ngOnInit():void{
    
    let productId = this.activateRoute.snapshot.paramMap.get('productId');  
       // console.log(productId);
        this.product.prelatedrProducts().subscribe((data)=>{
          this.relatedProducts = data;
        })

        productId && this.product.getProduct(productId).subscribe((result)=>{
          //console.log(result);
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if(productId && cartData)
        { 
          let items = JSON.parse(cartData);
           items = items.filter((item:product)=>productId==item.id.toString())
           if(items.length)
           {
                this.removeCart  = true;
           }else{
            this.removeCart  = false;
           }
        }
      
        let user = localStorage.getItem('user');
        if(user)
        {
            //console.log('user on sinle product page');  
            let userId = user && JSON.parse(user).id;
            this.product.getCartList(userId); 
             //console.log('hello hi');
            this.product.cartData.subscribe((result)=>{
              //console.log('helloooooooooooooo');
              //console.log(result);
              //console.log(productId);
            let item =   result.filter((item:product)=>productId?.toString()===item.productId?.toString())
           // console.log('testtt');  
           // console.log(item);
            if(item.length)
              {
               // console.log('in if');
                this.cartData = item[0]; 
                this.removeCart  = true;
              }else{
               // console.log('in else');
              }
            })
        }
    })
  }

  handelQuntity(val:string)
  {
     if(this.productQuantity<20 && val==='plus')
     {
      this.productQuantity+=1;
     }else if(this.productQuantity>1 && val==='min')
     {
      this.productQuantity-=1;
     }
  }


  AddToCart()
  {
      if(this.productData)
      {
         // console.log('hello');
          this.productData.quantity = this.productQuantity;
          
          if(!localStorage.getItem('user'))
          { 
            this.product.localAddToCart(this.productData);
            this.removeCart  = true;

          }else{
            let user = localStorage.getItem('user');
            let userId = user && JSON.parse(user).id;
           // console.log(userId);  

            if(userId)
            {
              let cartData:cart = {
                ...this.productData,
                userId,
                productId:this.productData.id,
              }
              delete cartData.id;
              //console.log(cartData); 
              this.product.addTocart(cartData).subscribe((result)=>{
                if(result){
                  // alert('product added  in cart and user id is'+userId);
                  //console.log(result);
                  this.product.getCartList(userId); 
                  this.removeCart  = true;
                }
              });

            }
          }
      }
  }


  removeToCart(productId:number)
  {
    if(!localStorage.getItem('user'))
    {
      this.product.removeItemFromCart(productId);
    }else{ 
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      //console.log(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result)
        {
          this.product.getCartList(userId); 
        }
      })
    }
    this.removeCart  = false;

  }

}
