import { currencies } from "../db/currency";

export default interface ICurrencyService {
  getCurrency(currency: string): Promise<number>;
}
export default class CurrencyService {
  async getCurrency(currency: string): Promise<number> {
    const found = currencies.find((curr) => curr.label == currency);
    if (found) return found.dolar;
    else throw Error("Not found");
  }
}
