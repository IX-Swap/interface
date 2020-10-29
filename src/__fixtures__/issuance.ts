import {
  DSORequestArgs,
  DSOFormValues,
  DsoTeamMember,
  DeploymentInfo
} from 'v2/types/dso'
import { corporate, asset } from './authorizer'
import { emptyFile } from '__fixtures__/file'
import { numberToPercentage } from 'v2/app/pages/issuance/utils'

export const deploymentInfo: DeploymentInfo = {
  _id: '12',
  createdBy: '',
  transactionHash: '',
  token: '',
  owner: '',
  name: '',
  symbol: '',
  decimals: 12345,
  policyBuilder: '',
  storageEngine: '',
  controller: '',
  documentController: '',
  createdAt: '2020-10-16T12:00:18.823Z',
  updatedAt: '2020-10-16T12:00:18.823Z',
  __v: 123
}

export const createDSOArgs: DSORequestArgs = {
  businessModel: 'business model',
  capitalStructure: 'capital structure',
  corporate: corporate._id,
  currency: asset._id,
  distributionFrequency: 'distribution frequency',
  dividendYield: 1,
  documents: [],
  equityMultiple: 1,
  fundraisingMilestone: 'fundraising milestone',
  grossIRR: 0,
  interestRate: 1,
  introduction: 'introduction',
  investmentPeriod: 1,
  investmentStructure: 'investment structure',
  issuerName: 'issuer name',
  launchDate: '01-01-2000',
  leverage: 1,
  logo: '5f4f7d87f3e2c40bbab8a3f1',
  minimumInvestment: 100,
  pricePerUnit: 1,
  subscriptionDocument: 'subscription document',
  team: [],
  tokenName: 'token name',
  tokenSymbol: 'token symbol',
  totalFundraisingAmount: 100000,
  useOfProceeds: 'use of proceeds',
  policyBuilder: undefined,
  status: 'Approved'
}

export const teamMember: DsoTeamMember = {
  _id: '0',
  about: 'about',
  name: 'name',
  photo: '1',
  position: 'position'
}

export const formvalues: DSOFormValues = {
  team: [
    {
      name: 'Team Ultimate',
      position: 'Maintainer',
      about: '<p>Hello world</p>'
    }
  ],
  documents: [
    {
      value: {
        _id: '5f898b52aa141c6d0d358ce5',
        user: '5f7c1398fbc4b5491a1634ce',
        title: '',
        type: '',
        originalFileName: 'a.jpg',
        createdAt: '2020-10-16T12:00:18.823Z',
        updatedAt: '2020-10-16T12:00:18.823Z'
      }
    }
  ],
  status: 'Submitted',
  logo: '5f898b69aa141c6d0d358ce6',
  useOfProceeds: '<p>Hello world</p>',
  totalFundraisingAmount: 100000,
  tokenSymbol: '$#',
  tokenName: 'IXWTKN',
  subscriptionDocument: emptyFile,
  pricePerUnit: 10,
  minimumInvestment: 200,
  leverage: 1,
  launchDate: '2020-10-16T18:30:00.000Z',
  issuerName: 'IXIssuer',
  investmentStructure: '1',
  investmentPeriod: 2,
  introduction: '<p>Hello world</p>',
  interestRate: 1,
  grossIRR: 1,
  fundraisingMilestone: '<p>Hello world</p>',
  equityMultiple: 1,
  dividendYield: 1,
  distributionFrequency: 'Monthly',
  currency: '5f732c5b8a568b50914d8373',
  corporate: '5f898a64aa141c6d0d358ce1',
  capitalStructure: 'Good',
  businessModel: '<p>Hello world</p>'
}

export const requestargs: DSORequestArgs = {
  team: [
    {
      name: 'Team Ultimate',
      position: 'Maintainer',
      about: '<p>Hello world</p>'
    }
  ],
  documents: ['5f898b52aa141c6d0d358ce5'],
  logo: '5f898b69aa141c6d0d358ce6',
  useOfProceeds: '<p>Hello world</p>',
  totalFundraisingAmount: 100000,
  subscriptionDocument: formvalues.subscriptionDocument?._id ?? '',
  pricePerUnit: 10,
  minimumInvestment: 200,
  leverage: numberToPercentage(formvalues.leverage),
  launchDate: '2020-10-16T18:30:00.000Z',
  investmentStructure: '1',
  investmentPeriod: 2,
  introduction: '<p>Hello world</p>',
  interestRate: numberToPercentage(formvalues.interestRate),
  grossIRR: numberToPercentage(formvalues.grossIRR),
  fundraisingMilestone: '<p>Hello world</p>',
  equityMultiple: numberToPercentage(formvalues.equityMultiple),
  dividendYield: numberToPercentage(formvalues.dividendYield),
  distributionFrequency: 'Monthly',
  currency: '5f732c5b8a568b50914d8373',
  corporate: '5f898a64aa141c6d0d358ce1',
  capitalStructure: 'Good',
  businessModel: '<p>Hello world</p>',
  issuerName: 'IXIssuer',
  tokenName: 'IXWTKN',
  tokenSymbol: '$#'
}
