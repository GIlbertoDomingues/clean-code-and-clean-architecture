import Cart, { IProduct } from "../src/Cart";

describe('Cart', () => {
  let cart = {} as Cart;


  let user = {
    id: 1,
    name: 'User 1',
    cpf: '187.463.370-32'
  };

  let product = {
    id: 1,
    name: 'Product 1',
    price: 100,
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

    cart.addItem({ products: product, quantity: 3, user  });

    expect(cart.getItems()).toEqual([
      { products: product, quantity: 3, user },
    ]);
    expect(cart.getTotal().getAmount()).toEqual(300);
  });

  it('Deve adicionar um item no carrinho e aplicar desconto', () => {
    cart.addItem({ products: product, quantity: 3, discount: 10, user });

    expect(cart.getItems()).toEqual([
      { products: product, quantity: 3, discount: 10, user },
    ]);
    expect(cart.getTotal().getAmount()).toEqual(270);
  });
});