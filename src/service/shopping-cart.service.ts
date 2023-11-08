export type Item = {
  amount: number;
  quantity: number;
};

export default class ShoppingCartService {
  items: Item[];
  subtotal: number = 0;
  taxes = 0;
  total = 0;

  constructor(
    readonly freight: number,
    readonly protection: number,
    readonly country: string
  ) {
    this.items = [];
  }

  addItem(amount: number, quantity: number) {
    this.items.push({ amount, quantity });
  }

  calculate() {
    this.calculateSubtotal();
    this.calculateTaxes();
    this.calculateTotal();
  }

  private calculateSubtotal() {
    this.subtotal = 0;
    for (const item of this.items) {
      this.subtotal += item.quantity * item.amount;
    }
  }

  private calculateTaxes() {
    this.taxes = 0;
    if (this.country === "BR") {
      if (this.subtotal + this.freight + this.protection > 50) {
        const importTax =
          (this.subtotal + this.freight + this.protection) * 0.6; //simulação de imposto de importação sobre produto + frete + seguro
        const ICMS =
          (this.subtotal + this.freight + this.protection + importTax) * 0.17; //simulação de ICMS sobre produto + frete + seguro imposto de importação
        this.taxes = importTax + ICMS;
      } else {
        this.taxes = (this.subtotal + this.freight) * 0.17; // ICMS sobre o produto + frete
      }
    }
  }

  private calculateTotal() {
    this.total = 0;
    this.total = this.subtotal + this.taxes + this.freight;
  }

 
}
