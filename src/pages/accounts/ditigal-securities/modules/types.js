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

export type TransferDetails = {
  asset: string,
  recipientWallet: string,
  amount: string,
  memo: string,
  otp: string,
  date: ?string,
};

export type DSState = {
  selectedCoin: ?UserSecurityBalance,
};
