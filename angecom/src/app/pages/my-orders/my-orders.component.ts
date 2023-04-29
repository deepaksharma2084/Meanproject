import { Component } from '@angular/core';
import { order } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData :order[]|undefined;

  constructor(private product:ProductService){}
  
  ngOnInit():void{
    this.getOrderList();
  }

  cancelorder(orderId:number|undefined)
  {
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{

    this.getOrderList();


    })
  }

  getOrderList()
  {
    this.product.orderList().subscribe((result)=>{

      console.log(result);
      this.orderData = result;
    })

  }

}
