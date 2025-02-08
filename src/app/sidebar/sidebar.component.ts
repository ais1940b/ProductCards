import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() cartToggle = new EventEmitter<void>();
  cartItemCount = 0;
  private cartSubscription: Subscription;

  constructor(private productService: ProductService, private cartService: CartService) {
    this.cartItemCount = this.cartService.getCart().length;
    this.cartSubscription = this.cartService.cartChanged.subscribe(() => {
      this.cartItemCount = this.cartService.getCart().length;
    });
  }

  toggleCart(): void {
    this.cartToggle.emit();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
