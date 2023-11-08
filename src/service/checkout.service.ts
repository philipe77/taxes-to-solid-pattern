import axios from "axios";

export default class CalculateCheckout {
  async execute(body: any) {
    const checkoutObj = body;
    const currency = (
      await axios.get(
        `http://localhost:3000/currencies/${checkoutObj.currency}`
      )
    ).data.dolar;
    let subtotal = 0;
    const freight = 2.6;
    const protection = 9;
    for (const item of checkoutObj.items) {
      const product = (
        await axios.get(`http://localhost:3000/products/${item.productId}`)
      ).data;
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
    console.log(currency);
    return {
      subtotal: Math.round(subtotal * currency * 100) / 100,
      taxes: Math.round(taxes * currency * 100) / 100,
      total: Math.round(total * currency * 100) / 100,
    };
  }
}

const checkoutService = async (body: any) => {};

export { checkoutService };
