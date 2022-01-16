import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productsSerVice: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productsSerVice.getProducts().subscribe((products) => {
      this.productList = products;
    })
  }

}
