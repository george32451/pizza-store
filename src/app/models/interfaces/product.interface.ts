export interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
  price: Price;
}

type Price = {
  currency: string,
  amount: string
};
