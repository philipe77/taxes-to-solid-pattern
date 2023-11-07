import { checkoutService } from "../service/checkout.service";

test("Deve calcular um pedido items adicionados", async () => {
  const input = {
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ],
    country:"BR",
    currency:"BRL"
  };
  const output = await checkoutService(input);
  //console.log(output)
  expect(output.subtotal).toBe(821.1);
  expect(output.taxes).toBe(767.59);
  expect(output.total).toBe(1601.95);
});
