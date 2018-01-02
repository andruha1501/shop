import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = !this.itemsMap ? {} : this.itemsMap.items;
    for (let productId in this.itemsMap) {
      let item = this.itemsMap[productId];
      let x = new ShoppingCartItem({
        ...item,
        key: productId
      });
      this.items.push(x);
    }
  }
 
  // constructor(public items: ShoppingCartItem[]) {}
  // // getQuantity(product) {
  // //   let item = this.items[product.key];
  // //   return item ? item.quantity : 0;
  // // }

  get totalItemCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }

  getQuantity(product) {
    let item = this.itemsMap[product.key];

    return item ? item.quantity : 0;
  }
}
