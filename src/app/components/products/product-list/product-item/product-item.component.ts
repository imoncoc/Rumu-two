import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem:any = Product;
  api = "http://localhost:4200/products";
  // url = "http://localhost:4200/products/CD-02"

  constructor(private msg: MessengerService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
  }

  handleAddToCart(){
    this.msg.sendMsg(this.productItem);
    console.log(this.productItem);
  }

  onSelect(data:any){
    this.router.navigate(["products/" + data.id]);
  }

}
