// @flow
import type { Asset } from '../assets/types';

export type Document = {
  _id: string,
  title: string,
  type: string,
  user: string,
  originalFileName: string,
  url?: string,
};

export type DsoTeamMember = {
  _id: string,
  name: string,
  position: string,
  about: string,
  photo: string, // documentId
};

export type DeploymentInfo = {
  _id: string,
  createdBy: string,
  transactionHash: string,
  token: string,
  owner: string,
  name: string,
  symbol: string,
  decimals: number,
  policyBuilder: string,
  storageEngine: string,
  controller: string,
  documentController: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
};

export type PolicyBuilder = {};

export type Dso = {
  _id: string,
  minimumInvestment: number,
  documents: Document[],
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
  deploymentInfo?: ?DeploymentInfo,
  policyBuilder?: ?PolicyBuilder,
};
