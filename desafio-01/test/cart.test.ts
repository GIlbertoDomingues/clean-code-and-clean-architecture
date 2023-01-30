import Cart, { IProduct } from "../src/Cart";

describe('Cart', () => {
  let cart = {} as Cart;

  let product = {
    id: 1,
    name: 'Product 1',
    price: 100,
    description: 'Product 1 description'
  };

  let product02 = {
    id: 2,
    name: 'Product 2',
    price: 200,
    description: 'Product 1 description'
  };

  beforeEach(() => {
    cart = new Cart();
  });

  it('Deve estar com o carrinho vazio', () => {
    expect(cart.getItems()).toEqual([]);
    expect(cart.getTotal().getAmount()).toEqual(0);
  });

  it('Deve adicionar um item no carrinho', () => {

    cart.addItem({ products: product, quantity: 1 });
    cart.addItem({ products: product, quantity: 1 });
    cart.addItem({ products: product, quantity: 1 });

    expect(cart.getItems()).toEqual([
      { products: product, quantity: 3 }
    ]);
    expect(cart.getTotal().getAmount()).toEqual(300);
  });

  it('Deve adicionar um item no carrinho e aplicar desconto', () => {
    cart.addItem({ products: product, quantity: 3, discount: 10 });

    expect(cart.getItems()).toEqual([
      { products: product, quantity: 3, discount: 10 },
    ]);
    expect(cart.getTotal().getAmount()).toEqual(270);
  });
});