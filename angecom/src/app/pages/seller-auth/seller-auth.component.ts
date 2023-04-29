import { Component } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import {Router} from '@angular/router';
import { SignUp } from 'src/app/data-type';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller:SellerService ,private router:Router){}

  showLogin = false;
  authError:string= '';

  ngOnInit():void{
   this.seller.reloadSeller()
  }

  signUp(data:SignUp):void{
    ///  console.warn(data);
      // this.seller.userSignUp(data).subscribe((result)=>{
      //   console.warn(result);
      //   if(result)
      //   {
      //     this.router.navigate(['seller-home'])
      //   }
      // });

       this.seller.userSignUp(data);

  }

  openLogin()
  {
    this.showLogin = true;

  }

  openSignUp()
  {
    this.showLogin = false;
  }

  login(data:SignUp):void{

    this.authError = '';
       // console.warn(data);
        this.seller.userLogin(data);
        this.seller.isLoginError.subscribe((isError)=>{
          if(isError)
          {
              this.authError = 'Email or password does not match!';
          }
        })
     
  }

  

}
