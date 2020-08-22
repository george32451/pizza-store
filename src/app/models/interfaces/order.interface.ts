import { firestore } from 'firebase/app';

import { User } from './user.interface';
import { CartProduct } from './cart-product.interface';
import { TotalPrice } from '../types/price.type';

export interface Order {
  id: number;
  timestamp: firestore.Timestamp;
  address: string;
  address2: string;
  client: Pick<User, 'email' | 'displayName'>;
  products?: CartProduct[];
  totalPrice: TotalPrice;
}
