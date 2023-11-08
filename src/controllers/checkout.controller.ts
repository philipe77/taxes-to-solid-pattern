import axios from "axios";
import { Request, Response } from "express";
import CalculateCheckout from "../service/checkout.service";
import CurrencyService from "../service/currency.service";
import { ProductRepository } from "../repository/product.repository";

export const checkout = async (req: Request, res: Response) => {
  const currencyService = new CurrencyService();
  const productRepo = new ProductRepository();
  const checkout = new CalculateCheckout(currencyService, productRepo);
  return res.send(checkout.execute(req.body));
};
