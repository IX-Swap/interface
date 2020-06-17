// @flow
export type DSDeposit = {
  _id: string,
  asset: {
    symbol: string,
    name: string,
    numberFormat: {
      currency: string,
    },
  },
  status: string,
  amount: number,
  date: string,
  hash: string,
};
