import { Request, Response } from "express";
import { allProducts } from "../db/product";

const getProducts = async (req: Request, res: Response) => {
  return res.send(allProducts);
};

const getProductById = async (req: Request, res: Response) => {
  const productId = +req.params.id;
  try {
    const found = allProducts.find((product) => product.id == productId);
    res.send(found);
  } catch (err) {
    console.info("Product not found");
  }
};

export { getProducts, getProductById };
