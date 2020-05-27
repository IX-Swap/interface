// @flow
import type { Asset } from '../assets/types';

export type DsoTeamMember = {
  _id: string,
  name: string,
  position: string,
  about: string,
  photo: string, // documentId
};

export type Dso = {
  _id: string,
  minimumInvestment: number,
  documents: any[], // TODO
  status: string,
  deleted: boolean,
  createdBy: string,
  issuerName: string,
  launchDate: string,
  capitalStructure: string,
  currency: Asset,
  pricePerUnit: number,
  totalFundraisingAmount: number,
  tokenName: string,
  tokenSymbol: string,
  investmentPeriod: number,
  dividendYeild: number,
  grossIRR: number,
  investmentStructure: string,
  equityMultiple: string,
  distributionFrequency: string,
  interestRate: number,
  leverage: string,
  subscriptionDocument: string,
  introduction: string,
  businessModel: string,
  useOfProceeds: String,
  fundraisingMilestone: string,
  team: DsoTeamMember[],
  createdAt: string,
  asset: string,
};
