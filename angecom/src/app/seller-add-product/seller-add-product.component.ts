import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage:string|undefined;


  SellerStore  = localStorage.getItem('seller');
  selleData =  this.SellerStore && JSON.parse(this.SellerStore);
  sellerId = this.selleData.id;

  constructor(private product:ProductService){}

  submit(data:product)
  {
    //console.log(data);
    this.product.addProduct(data).subscribe((result)=>{

      console.log(result);
      if(result)
      {
        this.addProductMessage = 'Product is successfully added ';
      }
      //setTimeout(()=>this.addProductMessage=undefined,3000)
    })
 
  }

}
