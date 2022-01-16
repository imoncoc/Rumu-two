import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api = "http://localhost:3000/products";


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.api);
  }

  getProduct(id:string): Observable<Product>{
    return this.http.get<Product>(this.api + "/" + id);
  }
}
