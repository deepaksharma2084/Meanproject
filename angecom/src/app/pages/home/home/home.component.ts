import { Component } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProducts:undefined|product[];
  trendyProducts:undefined|product[];
  
  constructor(private product:ProductService ){}
  
  ngOnInit():void{
    //console.log('Hello');
     this.product.popularProducts().subscribe((data)=>{
      //console.log(data);
      this.popularProducts = data;
     })

     this.product.trendyProducts().subscribe((data)=>{
      console.log(data);
      this.trendyProducts = data;
     })
 
  }
  

}
