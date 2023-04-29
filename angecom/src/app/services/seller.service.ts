import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    //console.warn('service call');
    let result = this.http.post(
      'https://bsaswm.com/reactdemo/api/register/seller',
       data,
      { observe: 'response' }
    ).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.warn('result', result);
    });
    //console.warn(result);
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:login)
  {
    // console.warn('api called');
     let result = this.http.post(
      `https://bsaswm.com/reactdemo/api/login-user`,
      data,
      { observe: 'response' }
    ).subscribe((result:any) => {
     // console.warn(result.body.role);
    
      if(result && result.body)
      {
        //console.warn(result.body.role);
		if(result.body.role=='seller')
		{
		  localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
		}else{
			localStorage.setItem('user', JSON.stringify(result.body));
            this.router.navigate(['/']);
		}
        
      }else{
        console.warn('login failed');
        this.isLoginError.emit(true);
      }

    });
  }


}
