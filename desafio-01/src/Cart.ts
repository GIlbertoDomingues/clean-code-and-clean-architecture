import Dinero from 'dinero.js';
import { validateCPF } from './utils';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface IUser {
  id: number;
  name: string;
  cpf: string;
}

export interface ICartItem {
  products: IProduct
  quantity: number
  discount?: number
  user: IUser
}

export default class Cart {
  items = [] as ICartItem[];

  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  validateDocument(user: IUser) {
    const userDocumentValid = validateCPF(user.cpf);

    if (!userDocumentValid) {
      throw new Error('Invalid document');
    }

    return userDocumentValid;
  }

  addItem(item: ICartItem) {

    const hasUser = this.items.find(
      user => user.user.id === this.items[0].user.id
    );

    const userDocument = this.validateDocument(item.user);

    if (userDocument) {
      const hasProduct = this.items.find(
        product => product.products.id === this.items[0].products.id
      );

      if (hasProduct) {
        hasProduct.quantity += 1;
        return;
      }

      this.items.push(item);
    }
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
