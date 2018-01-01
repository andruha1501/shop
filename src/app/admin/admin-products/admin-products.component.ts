import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  subscription: Subscription;
  filteredProducts: any[];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(product => this.filteredProducts = this.products = product);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
        this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
