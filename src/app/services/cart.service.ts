import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../modules/cart-item';
import { map } from 'rxjs/operators';
import { Product } from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _cartApi = "http://localhost:3000/cart";

  constructor(private http: HttpClient) { }

  getCartItem(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this._cartApi).pipe(
      map((result:any[]) => {
        let cartItems: CartItem[] = [];
        for(let item of result){
          cartItems.push(new CartItem(item.id, item.product, item.qty))
        }
        return cartItems;
      })
    )
  }


  addProductToCart(product: Product): Observable<any>{
    return this.http.post(this._cartApi, {qty: 1, product});
  }

  updateProductCart(cardData: CartItem, product: Product): Observable<any> {
    return this.http.patch(this._cartApi+"/"+cardData.id, {qty: cardData.qty, product})
  }


}
