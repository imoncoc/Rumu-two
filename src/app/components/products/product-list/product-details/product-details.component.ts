import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  dataSource: any = null;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      this.productsService.getProduct(id).subscribe((product:Product) => {
       this.dataSource = product;
      })
    })
  }

  btnClick(){
    this.router.navigate(['/home']);
  }

}

