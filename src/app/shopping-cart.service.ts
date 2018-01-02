import { ShoppingCart } from "./shared/models/shopping-cart";
import { Product } from "./shared/models/product";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .snapshotChanges()
      .map(x => new ShoppingCart(x.payload.val()));
  }

  async addToCart(product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private getItem(cardId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cardId + "/items/" + productId);
  }

  private async updateItem(product, change: number) {
    let cardId = await this.getOrCreateCartId();
    let item$ = this.getItem(cardId, product.key);
    item$
      .snapshotChanges()
      .take(1)
      .subscribe(item => {
        if (item.payload.exists()) {
          let quantity = item.payload.val().quantity + change;
          if (quantity === 0) item$.remove();
          else
          item$.update({ quantity: quantity });
        }
        else
          item$.set({
            title: product.payload.val().title,
            imageUrl: product.payload.val().imageUrl,
            price: product.payload.val().price,
            quantity: 1
          });
      });
  }
}
