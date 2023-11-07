import { Request, Response } from "express";
import { currencies } from "../db/currency";

export const getCurrencies = async (req: Request, res: Response) => {
  return res.send(currencies);
};

export const getCurrencByLabel = async (req: Request, res: Response) => {
  const label:any = req.params.id;
  try {
    const found = currencies.find((currency) => currency.label == label);
    res.send(found);
  } catch (err) {
    console.info("Currency not found");
  }
};
