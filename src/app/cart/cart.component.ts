import { Component } from '@angular/core';
import { CartService, Product } from '../cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(product: Product): void {
    const index = this.cartItems.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartService.updateLocalStorage();
      this.cartService.cartChanged.next(this.cartItems); // Emit the updated cart
    }
  }
  
}
