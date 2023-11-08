import ProductRepository from "../repository/product.repository";
import CalculateCheckout from "../service/checkout.service";
import CurrencyService from "../service/currency.service";

let calculateCheckout: CalculateCheckout;

beforeEach(() => {
  const currencyService = new CurrencyService();
  const productRepository = new ProductRepository();
  calculateCheckout = new CalculateCheckout(currencyService, productRepository);
});

test("Deve calcular um pedido items adicionados", async () => {
  const input: any = {
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ],
    country: "BR",
    currency: "BRL",
  };
  
  const output = await calculateCheckout.execute(input);
  //console.log(output)
  expect(output.subtotal).toBe(821.1);
  expect(output.taxes).toBe(767.59);
  expect(output.total).toBe(1601.95);
});
