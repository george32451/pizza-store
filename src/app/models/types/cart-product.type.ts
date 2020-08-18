import { Product } from '../interfaces/product.interface';

export type CartProduct = Pick<Product, 'id' | 'price'> & { quantity: number };
