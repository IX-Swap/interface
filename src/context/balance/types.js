export type Balance = {
  debitTotal: number,
  creditTotal: number,
  balance: number,
  lastTransaction: string,
  assetId: string,
  symbol: string,
  name: string,
  type: string,
};

export type UserSecurityBalance = Balance & {
  numberFormat: {
    currency: string,
  },
  onHold: number,
  available: number,
};
