import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId(); 
        return this.db.object('/shopping-carts/' + cartId).valueChanges()
        .map(x => new ShoppingCart(x['items']));
      }  

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cardId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cardId + '/items/' + productId);
  }

  async addToCart(product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product, change: number) {
    let cardId = await this.getOrCreateCartId();
    let item$ = this.getItem(cardId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) item$.update({quantity: item.payload.val().quantity + change});
      else item$.set({product: product.payload.val(), quantity: 1})
    });
  }
}
