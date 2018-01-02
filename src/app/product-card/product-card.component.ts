import { ShoppingCart } from '../shared/models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from '../shared/models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 
  
  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCard() {
    this.cartService.addToCart(this.product);
  }


  


}
