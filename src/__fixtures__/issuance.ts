import { DSORequestArgs, DSOFormValues, DeploymentInfo } from 'v2/types/dso'
import { corporate, asset } from './authorizer'

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
  equityMultiple: 'equity multiple',
  fundraisingMilestone: 'fundraising milestone',
  grossIRR: 0,
  interestRate: 1,
  introduction: 'introduction',
  investmentPeriod: 1,
  investmentStructure: 'investment structure',
  issuerName: 'issuer name',
  launchDate: '01-01-2000',
  leverage: 'leverage',
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

export const formvalues: DSOFormValues = {
  team: [
    {
      name: 'Team Ultimate',
      position: 'Maintainer',
      about:
        '{"blocks":[{"key":"e12jc","text":"Foo","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    }
  ],
  documents: [
    {
      document: {
        _id: '5f898b52aa141c6d0d358ce5',
        user: '5f7c1398fbc4b5491a1634ce',
        title: '',
        type: '',
        originalFileName: 'a.jpg',
        createdAt: '2020-10-16T12:00:18.823Z',
        updatedAt: '2020-10-16T12:00:18.823Z'
      },
      label: '',
      title: '',
      type: ''
    }
  ],
  status: 'Submitted',
  logo: '5f898b69aa141c6d0d358ce6',
  useOfProceeds:
    '{"blocks":[{"key":"5mjvv","text":"As usual","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  totalFundraisingAmount: 100000,
  tokenSymbol: '$#',
  tokenName: 'IXWTKN',
  subscriptionDocument: '5f898b02aa141c6d0d358ce4',
  pricePerUnit: 10,
  minimumInvestment: 200,
  leverage: '1',
  launchDate: '2020-10-16T18:30:00.000Z',
  issuerName: 'IXIssuer',
  investmentStructure: '1',
  investmentPeriod: 2,
  introduction:
    '{"blocks":[{"key":"3r09q","text":"Introducing IXW token","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  interestRate: 1,
  grossIRR: 1,
  fundraisingMilestone:
    '{"blocks":[{"key":"2ofbo","text":"next month","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  equityMultiple: '1',
  dividendYield: 1,
  distributionFrequency: 'Monthly',
  currency: '5f732c5b8a568b50914d8373',
  corporate: '5f898a64aa141c6d0d358ce1',
  capitalStructure: 'Good',
  businessModel:
    '{"blocks":[{"key":"fjodt","text":"lorem ipsum","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
}

export const requestargs: DSORequestArgs = {
  team: [
    {
      name: 'Team Ultimate',
      position: 'Maintainer',
      about: '<p>Foo</p>\n'
    }
  ],
  documents: ['5f898b52aa141c6d0d358ce5'],
  logo: '5f898b69aa141c6d0d358ce6',
  useOfProceeds: '<p>As usual</p>\n',
  totalFundraisingAmount: 100000,
  subscriptionDocument: '5f898b02aa141c6d0d358ce4',
  pricePerUnit: 10,
  minimumInvestment: 200,
  leverage: '1',
  launchDate: '2020-10-16T18:30:00.000Z',
  investmentStructure: '1',
  investmentPeriod: 2,
  introduction: '<p>Introducing IXW token</p>\n',
  interestRate: 1,
  grossIRR: 1,
  fundraisingMilestone: '<p>next month</p>\n',
  equityMultiple: '1',
  dividendYield: 1,
  distributionFrequency: 'Monthly',
  currency: '5f732c5b8a568b50914d8373',
  corporate: '5f898a64aa141c6d0d358ce1',
  capitalStructure: 'Good',
  businessModel: '<p>lorem ipsum</p>\n',
  issuerName: 'IXIssuer',
  tokenName: 'IXWTKN',
  tokenSymbol: '$#'
}
