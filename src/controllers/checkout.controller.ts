import axios from "axios";
import { Request, Response } from "express";
import { checkoutService } from "../service/checkout.service";

export const checkout = async (req: Request, res: Response) => {
  return res.send(checkoutService(req.body));
};
