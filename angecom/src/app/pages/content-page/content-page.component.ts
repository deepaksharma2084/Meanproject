import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent {

  pateContent:undefined|any;
  pageHeading:undefined|any;

  constructor(private product:ProductService , private activateRoute:ActivatedRoute,private router:Router){}


     ngOnInit():void{

      //console.log(this.router.url);

      let getCurrentRoute = this.router.url;
      let currentRoute = getCurrentRoute.replace('/','');
	  
	  if(currentRoute)
	  {
			this.product.pageContent(currentRoute).subscribe((resut)=>{
			
			    //let getresult =JSON.parse(resut[0]);
			   // console.log(resut.json());
				 // console.log(JSON.parse(getresult).title);
				if(resut)
				{
					 let getres =  JSON.stringify(resut);
                     let getParsedval = 	JSON.parse(getres)	;				
					 this.pateContent =  getParsedval[0].content;
					 this.pageHeading =  getParsedval[0].title;
					 
				}
				//`console.log(resut[0].title);
			
                //return this.pateContent =  resut;	
				
				//let gttt =  JSON.stringify(resut);
			   // let ffkdfk = 	JSON.parse(gttt)
				//console.log(ffkdfk[0].title);
			
			})	 
			
	  }

     // console.log(currentRoute);

      //let pagename = this.activateRoute.snapshot.paramMap.get('productId'); 



     }
 


}
