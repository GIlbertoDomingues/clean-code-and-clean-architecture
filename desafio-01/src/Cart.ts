import Dinero from 'dinero.js';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface ICartItem {
  products: IProduct
  quantity: number
  discount?: number
}

export default class Cart {

  items = [] as ICartItem[];

  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  addItem(item: ICartItem) {
    const hasProduct = this.items.find(
      product => product.products.id === this.items[0].products.id
    );

    if (hasProduct) {
      hasProduct.quantity += 1;
      return;
    }

    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce((total, item) => {

      const amount = Money({ amount: total.getAmount() + (item.products.price * item.quantity) });
      let discountAmount = amount.percentage(item.discount || 0);

      if (item.discount) {
        return Money({ amount: amount.getAmount() - discountAmount.getAmount() });
      } else {
        return Money({ amount: amount.getAmount() });
      }
    }
    , Money({ amount: 0 }));
  }
}
