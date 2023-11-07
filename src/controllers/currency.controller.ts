import { Request, Response } from "express";
import { currencies } from "../db/currency";

export const getCurrencies = async (req: Request, res: Response) => {
  return res.send(currencies);
};

export const getCurrencById = async (req: Request, res: Response) => {
  const id = +req.params.id;
  try {
    const found = currencies.find((currency) => currency.id == id);
    res.send(found);
  } catch (err) {
    console.info("Currency not found");
  }
};
