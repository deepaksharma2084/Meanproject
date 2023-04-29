import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data: SignUp) {
    //console.warn('service call');
    let result = this.http.post(
      'https://bsaswm.com/reactdemo/api/register/user',
       data,
      { observe: 'response' }
    ).subscribe((result) => {

      if(result)
      {
        console.warn('result', result);
        localStorage.setItem('user', JSON.stringify(result.body)); 
        this.router.navigate(['/']);
      }
     // this.isSellerLoggedIn.next(true);
    });
    //console.warn(result);
  }

  userLogin(data:login)
  {
    // console.warn('api called');
     let result = this.http.post(
      `https://bsaswm.com/reactdemo/api/login-user`,
       data,
      { observe: 'response' }
    ).subscribe((result:any) => {
      console.warn(result);
      console.warn(result.body);
      console.warn(result.body.length);

      if(result && result.body)
      { 
        this.isLoginError.emit(false);
       // console.warn('login succssess');
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }else{
        console.warn('login failed');
        this.isLoginError.emit(true);
      }

    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

}
