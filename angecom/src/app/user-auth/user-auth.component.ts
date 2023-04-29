import { Component } from '@angular/core';
import { cart, product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  constructor(private user: UserService,private product:ProductService) { }


  ngOnInit(): void {
    this.user.userAuthReload()
  }

  showLogin = false;
  authError: string = '';

  openLogin() {
    this.showLogin = true;

  }

  openSignUp() {
    this.showLogin = false;
  }


  signUp(data: SignUp): void {
    //console.log(data);
    this.user.userSignUp(data);

  }

  login(data: SignUp): void {
    this.authError = '';
    //console.warn(data);
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password does not match!';
      } else {

        setTimeout(()=>{
            this.localCartToRemoteCart();
        },1000);
       
      }
    })
  }

  localCartToRemoteCart() {
    //console.warn('cart iteam transfered local to db');
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data && userId) {
      let cartDataList: product[] = JSON.parse(data);
     
     cartDataList.forEach((product: product,index) => { 
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        }
        delete cartData.id; 
       // console.log(cartData);
        setTimeout(()=>{
            this.product.addTocart(cartData).subscribe((result)=>{
              if(result)
              {
                console.log('iteam stored in db');
              }       
          })
        },500);

          if(cartDataList.length=== index+1)
          {
            localStorage.removeItem('localCart');
          }

      })
    }

    setTimeout(()=>{
      console.log('get cart list');
        this.product.getCartList(userId);
    },2000)

  

  }

}
