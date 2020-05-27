// @flow
export type DSWithdrawal = {
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
  memo: string,
};
