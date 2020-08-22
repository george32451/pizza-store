import { Price } from '../types/price.type';

export interface Product {
  id: number;
  title: string;
  desc: string;
  image: string;
  price: Price;
}
