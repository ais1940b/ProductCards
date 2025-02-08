import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: any = [];
  cartChanged = new Subject<Product[]>();

  constructor(){
    // Load cart from local storage if it exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.updateLocalStorage();
    this.cartChanged.next(this.cart); // Emit the updated cart
  }

  getCart(): Product[] {
    return this.cart;
  }

  updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
