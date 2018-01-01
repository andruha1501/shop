import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  category: string;
  filteredProducts: Product[] = [];
  cart: any;
  subscription: Subscription
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
      this.productService
        .getAll()
        .switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        }).subscribe(params => {
            this.category = params.get('category');
            this.filteredProducts = (this.category) ?
            this.products.filter(p => p.payload.val().category === this.category) :
            this.products;
        });

    
   }

  async ngOnInit() {
   this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
