import { allProducts } from "../db/product";

export default class ProductRepository {
  async getProduct(id: number): Promise<any> {
    console.info("init connection");
    const found = allProducts.find((product) => product.id == id);
    console.info("close connection");
    return found;
  }
}
