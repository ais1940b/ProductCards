import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService, Product } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient, private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // Optionally, show some feedback to the user
  }

  getProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }
}
