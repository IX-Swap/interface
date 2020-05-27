import type { Dso } from 'context/dso/types';
import type { Asset } from 'context/assets/types';

export type Commitment = {
  _id: string,
  status: 'Unauthorized' | 'Approved' | 'Rejected',
  deleted: boolean,
  createdBy: string,
  dso: Dso,
  currency: Asset,
  walletAddress: string,
  numberOfUnits: number,
  pricePerUnit: number,
  totalAmount: number,
  hold: string,
  createdAt: string,
};
