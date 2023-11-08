import axios from "axios";
import CurrencyService from "./currency.service";
import { ProductRepository } from "../repository/product.repository";
import { Inject, Registry } from "./DI.service";
import ShoppingCartService from "./shopping-cart.service";
export default class CalculateCheckout {
  @Inject("currencyService")
  currencyService!: CurrencyService;
  @Inject("productRepository")
  productRepository!: ProductRepository;

  constructor() {}

  async execute(body: Input) {
    const currency = await this.currencyService.getCurrency(body.currency);
    const freight = 2.6;
    const protection = 9;
    const shoppingCart = new ShoppingCartService(freight, protection, body.country);
    for (const item of body.items) {
      const product = await this.productRepository.getProduct(item.productId);
      shoppingCart.addItem(+product.amount, +item.quantity);
    }
    shoppingCart.calculate();
    return {
      subtotal: Math.round(shoppingCart.subtotal * currency * 100) / 100,
      taxes: Math.round(shoppingCart.taxes * currency * 100) / 100,
      total: Math.round(shoppingCart.total * currency * 100) / 100,
    };
  }
}

type Input = {
  items: [{ productId: number; quantity: number }];
  country: string;
  currency: string;
};

type Output = {
  subtotal: number;
  taxes: number;
  total: number;
};
