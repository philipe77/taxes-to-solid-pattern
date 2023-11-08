import axios from "axios";
import CurrencyService from "./currency.service";
import ProductRepository from "../repository/product.repository";

export default class CalculateCheckout {

  async execute(body: Input) {
    const checkoutObj = body;
    const currencyService = new CurrencyService();
    const productRepository = new ProductRepository();
    const currency = await currencyService.getCurrency(body.currency);
    let subtotal = 0;
    const freight = 2.6;
    const protection = 9;
    for (const item of checkoutObj.items) {
      const product = await productRepository.getProduct(item.productId);
      const amount = parseFloat(product.amount);
      const itemAmount = item.quantity * amount;
      subtotal += itemAmount;
    }
    let taxes = 0;
    if (checkoutObj.country === "BR") {
      if (subtotal + freight + protection > 50) {
        const importTax = (subtotal + freight + protection) * 0.6; //simulação de imposto de importação sobre produto + frete + seguro
        const ICMS = (subtotal + freight + protection + importTax) * 0.17; //simulação de ICMS sobre produto + frete + seguro imposto de importação
        taxes = importTax + ICMS;
      } else {
        taxes = (subtotal + freight) * 0.17; // ICMS sobre o produto + frete
      }
    }
    const total = subtotal + taxes + freight;

    return {
      subtotal: Math.round(subtotal * currency * 100) / 100,
      taxes: Math.round(taxes * currency * 100) / 100,
      total: Math.round(total * currency * 100) / 100,
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
