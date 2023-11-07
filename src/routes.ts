import { Router } from "express";
import { getCurrencByLabel, getCurrencies } from "./controllers/currency.controller";
import { getProductById, getProducts } from "./controllers/product.controller";
import { checkout } from "./server";

const router: Router = Router();

const fakeObj = {
  items: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 }
  ],
  country: "BR",
  currency: "BRL"
}

router.get("/", async (req, res) => {
  const obj  = await checkout(fakeObj)
  return res.send(obj);
});

router.get("/currencies", getCurrencies);
router.get("/currencies/:id", getCurrencByLabel);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

export { router };
