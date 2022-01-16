import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/modules/cart-item';
import { Product } from 'src/app/modules/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Array<CartItem> = [];
  cartTotal: number = 0;
  _cartApi = "http://localhost:3000/cart";

  constructor(private msg: MessengerService,
              private cartService: CartService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription(){
    this.msg.getMsg().subscribe((product:Product) => {

      const cartIndex = this.cartItems.findIndex((data:CartItem) => data.productId === product.id);
      if (cartIndex == -1) {
        this.cartService.addProductToCart(product).subscribe(() => {
          console.log(product);
          this.loadCartItems();
        })
      }
      else {
        const cartData = this.cartItems[cartIndex];
        cartData.qty ++;
        this.cartService.updateProductCart(cartData, product).subscribe((resp) => {
          if(resp) {
            this.cartItems[cartIndex] = cartData;
            this.calcCartTotal();
          }
        })
      }

    })
  }

  loadCartItems(){
    this.cartService.getCartItem().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calcCartTotal();
    })
  }

  calcCartTotal(){
    this.cartTotal = 0;
    this.cartItems.forEach((item:CartItem) => {
      this.cartTotal += (item.qty * item.price);
    });
  }

  clearCart(){
    this.cartItems.forEach((item:CartItem) => {
      this.http.delete(this._cartApi+"/"+item.id).subscribe((response: any) => {
      });
    })

    this.cartItems = [];
  }

}
