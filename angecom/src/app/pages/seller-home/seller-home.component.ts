
import { Component } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import {faCoffee,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList:undefined|product[];
  productMessage:undefined|string;
  icon = faCoffee;
  trashIcon = faTrash;
  editIcon = faEdit;

  SellerStore  = localStorage.getItem('seller');
  selleData =  this.SellerStore && JSON.parse(this.SellerStore);
  sellerId = this.selleData.id;

  constructor(private product:ProductService){}

  ngOnInit():void{ 
      this.list(this.sellerId);
    //  this.product.productList().subscribe((result)=>{
    //   this.productList = result;
    //   console.log(this.productList);
    //  })

    }

    deleteProudct(id:number)
    {
        console.log('test id'+id);
        this.product.deleteProduct(id).subscribe((result)=>{
        if(result)
        {
            this.productMessage = 'Product is deleted';
            this.list(this.sellerId);
        }

        })

        setTimeout(()=>{
          this.productMessage = undefined;
        },500);
    }

    list(sellerId:string)
    {
      this.product.productListSeller(sellerId).subscribe((result)=>{
        this.productList = result;
        console.log(this.productList);
       })

    }

}
