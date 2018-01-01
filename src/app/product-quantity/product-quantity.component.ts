import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart; 
  
  constructor(private cardService: ShoppingCartService) { }

  ngOnInit() {
  }
  
  

  addToCard() {
    this.cardService.addToCart(this.product);
  }

  removeFromCart() {
    this.cardService.removeFromCart(this.product);
  }
}
