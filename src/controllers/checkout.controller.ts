import axios from "axios";
import { Request, Response } from "express";
import CalculateCheckout from "../service/checkout.service";


export const checkout = async (req: Request, res: Response) => {
  const checkout  = new CalculateCheckout();
  return res.send(checkout.execute(req.body));
};
