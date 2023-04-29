import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData:undefined | product; 
  productMessage :undefined | string;

  constructor(private route:ActivatedRoute , private product:ProductService){}

  ngOnInit():void{

      let productId  = this.route.snapshot.paramMap.get('id');
      console.log(productId);
      productId && this.product.getProduct(productId).subscribe((data)=>{

        console.log(data);
        this.productData = data;
      });
  }

  submit(data:product)
  {
    if(this.productData)
    {
      data.id  =  this.productData.id;
    }

    console.log(data);
    //updateProduct
    this.product.updateProduct(data).subscribe((result)=>{

      if(result)
      {
          this.productMessage = 'product has updated';
      } 

    });

    setTimeout(()=>{
      this.productMessage  = undefined;
    },3000);
    
  }

}
