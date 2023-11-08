import { Request, Response } from "express";
import CalculateCheckout from "../service/checkout.service";
import { Registry } from "../service/DI.service";

export const checkout = async (req: Request, res: Response) => {
  const registry = new Registry();
  const checkout = new CalculateCheckout(registry);
  return res.send(checkout.execute(req.body));
};
