import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { CartComponent } from './cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-cards-app';
  products: any = [];
  gridColumns = 3;
  cartVisible = false;
  cartItemCount = 0;
  private cartSubscription: Subscription;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  constructor(private productService: ProductService, private cartService: CartService, public dialog: MatDialog){
    this.cartItemCount = this.cartService.getCart().length;
    this.cartSubscription = this.cartService.cartChanged.subscribe(() => {
      this.cartItemCount = this.cartService.getCart().length;
    });
  }

  openCart(): void {
    this.cartVisible = !this.cartVisible;
    // const cartElement = document.querySelector('app-cart');

    const dialogRef = this.dialog.open(CartComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  getProducts() {
    this.productService.getProducts().subscribe((prod) => {
      this.products = prod;
    })
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
