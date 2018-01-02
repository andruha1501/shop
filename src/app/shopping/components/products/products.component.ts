import { ShoppingCart } from "../../../shared/models/shopping-cart";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { ShoppingCartService } from "../../../shared/services/shopping-cart.service";
import { Product } from "../../../shared/models/product";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products = [];
  category: string;
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
   this.populateProducts();
  }

  private populateProducts() {
    this.productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get("category");
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = this.category
    ? this.products.filter(p => p.payload.val().category === this.category)
    : this.products;
  }
}
