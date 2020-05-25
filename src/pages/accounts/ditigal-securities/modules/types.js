// @flow

export type UserSecurityBalance = {
  debitTotal: number,
  creditTotal: number,
  balance: number,
  lastTransaction: string,
  assetId: string,
  symbol: string,
  name: string,
  type: string,
  numberFormat: {
    currency: string,
  },
  onHold: number,
  available: number,
};
