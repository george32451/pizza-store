export type Price = {
  currency: string,
  amount: string,
};

export type TotalPrice = Pick<Price, 'currency'> & {
  multiplier: number,
  baseAmount: string,
  currencyBasedAmount: string;
};
