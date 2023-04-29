import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  menuType: string = 'default';
  sellerName:string = ''; 
  userName:string = '';
   cartItems = 0;
  constructor( private route:Router,private product:ProductService){}

  ngOnInit(): void {
    //console.log(this.route.url);
    if (this.route.url) {
      if (localStorage.getItem('seller') && this.route.url.includes('seller') ) 
      {
        this.menuType = 'seller';
        if(localStorage.getItem('seller'))
        { 
         
          let SellerStore  = localStorage.getItem('seller');
            //console.log(SellerStore);
            let selleData =  SellerStore && JSON.parse(SellerStore);
           // console.log(selleData);
            this.sellerName = selleData.username;
            //console.log(this.menuType+'1111');
            
        }
      }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData  = userStore && JSON.parse(userStore);
            this.userName = userData.username;
            this.menuType = 'user';

            this.product.getCartList(userData.id); 
           // console.log(userData);
           // console.log(this.menuType+'22222222');
        }else{
          this.menuType = 'default';
          //console.log(this.menuType+'333333');
        }

    }


    let cartData = localStorage.getItem('localCart');
    if(cartData)
    {
        this.cartItems = JSON.parse(cartData).length;
    }
      
   this.product.cartData.subscribe((items)=>{
      this.cartItems =items.length; 
   })
    
    

    // this.route.events.subscribe((val: any) => {
    //   this.username = 'shyam';
    //   this.menuType = 'seller';
    //   //alert(val.url)
    //   if (val.url) {
    //     console.log(val.url+'  ttt');
    //    // if (localStorage.getItem('seller')) {
    //       console.log('yess');
    //       this.menuType = 'seller_yyy';
    //        console.log(this.menuType);
    //       this.username = 'mohan';
    //     // }else {
    //     //   this.menuType = 'default';
    //     // }
    //   }else{
    //        this.menuType = 'nosellser';
           
    //        console.log(this.menuType);
    //   }
    // });
 
    
  }

   //Logout
  sellerLogout()
  {
     localStorage.removeItem('seller');
     this.route.navigate(['/']);
     this.product.cartData.emit([]);
  }

  userLogout()
  {
    console.log('user logout'); 
    localStorage.removeItem('user');
     this.route.navigate(['/user-auth']); 
  }



}
