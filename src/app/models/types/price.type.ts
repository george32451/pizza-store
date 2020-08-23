import { CurrencyEnum } from '../enums/currency.enum';

export type Price = {
  currency: CurrencyEnum,
  amount: string,
};

export type TotalPrice = Pick<Price, 'currency'> & {
  multiplier: number,
  baseAmount: string,
  currencyBasedAmount: string;
};
