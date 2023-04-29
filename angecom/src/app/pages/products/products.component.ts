import { Component } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private product:ProductService){}

  productData:undefined|product[];


  ngOnInit():void{
      this.product.allProducts().subscribe((result)=>{

         this.productData = result

      })
  }


}
