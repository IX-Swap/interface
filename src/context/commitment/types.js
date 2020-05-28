import type { Dso } from 'context/dso/types';
import type { Asset } from 'context/assets/types';
import type { Identity } from 'pages/identity/modules/types';

export type Commitment = {
  _id: string,
  status: string,
  createdBy: string,
  dso: Dso,
  currency: Asset,
  walletAddress: string,
  numberOfUnits: number,
  pricePerUnit: number,
  totalAmount: number,
  hold: string,
  createdAt: string,
  updatedAt: string,
  individual: Identity,
};
