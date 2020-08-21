import { firestore } from 'firebase';

import { User } from './user.interface';
import { CartProduct } from './cart-product.interface';
import { Price } from '../types/price.type';

export interface Order {
  id: number;
  timestamp: firestore.Timestamp;
  address: string;
  address2: string;
  client: Pick<User, 'email' | 'displayName'>;
  products?: CartProduct[];
  totalPrice: Price;
}
