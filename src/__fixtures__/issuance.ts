import {
  DSORequestArgs,
  DSOFormValues,
  DsoTeamMember,
  DeploymentInfo,
  DSOInsight,
  DSOActivity,
  DsoFAQItem,
  DsoVideo,
  DepositAddress
} from 'types/dso'
import { corporate, asset } from './authorizer'
import { emptyFile } from '__fixtures__/file'
import { numberToPercentage } from 'app/pages/issuance/utils'
import { network } from './network'
import { individual } from '__fixtures__/identity'

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

export const dsoInsight: DSOInsight = {
  activityCount: 65,
  approvedcommitmentCount: 1,
  collectedOn: '2020-11-24T17:06:23.555Z',
  commitmentCount: 0,
  commitmentTotal: 0,
  investorCount: 1,
  raisedMax: 400,
  raisedMin: 400,
  raisedTotal: 400
}

export const createDSOArgs: DSORequestArgs = {
  businessModel: 'business model',
  capitalStructure: 'capital structure',
  corporate: corporate._id,
  currency: asset._id,
  distributionFrequency: 'distribution frequency',
  dividendYield: 1,
  documents: [],
  network: network._id,
  equityMultiple: 1,
  fundraisingMilestone: 'fundraising milestone',
  grossIRR: 0,
  interestRate: 1,
  introduction: 'introduction',
  investmentPeriod: 1,
  investmentStructure: 'investment structure',
  issuerName: 'issuer name',
  launchDate: '01-01-2000',
  completionDate: '12-12-2220',
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

export const faqItem: DsoFAQItem = {
  _id: '0',
  question: 'Question',
  answer: 'Answer'
}

export const videoLink: DsoVideo = {
  _id: '0',
  title: 'Title',
  link: 'Link'
}

export const formValues: DSOFormValues = {
  team: [
    {
      name: 'Team Ultimate',
      position: 'Maintainer',
      about: '<p>Hello world</p>',
      photo: 'id'
    }
  ],
  faqs: [
    {
      question: 'FAQ #1',
      answer: 'Text'
    }
  ],
  videos: [
    {
      title: 'Video #1',
      link: 'Link'
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
  completionDate: '2220-10-16T18:30:00.000Z',
  issuerName: 'IXIssuer',
  investmentStructure: '1',
  investmentPeriod: 2,
  introduction: '<p>Hello world</p>',
  interestRate: 1,
  grossIRR: 1,
  network: network._id,
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
      about: '<p>Hello world</p>',
      photo: 'id'
    }
  ],
  network: network._id,
  documents: ['5f898b52aa141c6d0d358ce5'],
  logo: '5f898b69aa141c6d0d358ce6',
  useOfProceeds: '<p>Hello world</p>',
  totalFundraisingAmount: 100000,
  subscriptionDocument: formValues.subscriptionDocument?._id ?? '',
  pricePerUnit: 10,
  minimumInvestment: 200,
  leverage: numberToPercentage(formValues.leverage),
  launchDate: '2020-10-16T18:30:00.000Z',
  completionDate: '2220-10-16T18:30:00.000Z',
  investmentStructure: '1',
  investmentPeriod: 2,
  introduction: '<p>Hello world</p>',
  interestRate: numberToPercentage(formValues.interestRate),
  grossIRR: numberToPercentage(formValues.grossIRR),
  fundraisingMilestone: '<p>Hello world</p>',
  equityMultiple: numberToPercentage(formValues.equityMultiple),
  dividendYield: numberToPercentage(formValues.dividendYield),
  distributionFrequency: 'Monthly',
  currency: '5f732c5b8a568b50914d8373',
  corporate: '5f898a64aa141c6d0d358ce1',
  capitalStructure: 'Good',
  businessModel: '<p>Hello world</p>',
  issuerName: 'IXIssuer',
  tokenName: 'IXWTKN',
  tokenSymbol: '$#'
}

export const investmentGrowthData: Array<[Date, number]> = [
  [new Date(2020, 11, 1, 1), 1000],
  [new Date(2020, 11, 1, 3), 1500],
  [new Date(2020, 11, 1, 6), 2500],
  [new Date(2020, 11, 1, 9), 3000],
  [new Date(2020, 11, 1, 12), 4500],
  [new Date(2020, 11, 1, 15), 5500],
  [new Date(2020, 11, 1, 18), 6000],
  [new Date(2020, 11, 1, 21), 7500],
  [new Date(2020, 11, 1, 24), 6500],
  [new Date(2020, 11, 2, 1), 8000],
  [new Date(2020, 11, 2, 3), 9500],
  [new Date(2020, 11, 2, 6), 10000],
  [new Date(2020, 11, 2, 9), 12000],
  [new Date(2020, 11, 2, 12), 11500],
  [new Date(2020, 11, 2, 15), 13500],
  [new Date(2020, 11, 2, 18), 14000],
  [new Date(2020, 11, 2, 21), 11500],
  [new Date(2020, 11, 2, 24), 13500],
  [new Date(2020, 11, 3, 1), 11000],
  [new Date(2020, 11, 3, 3), 11200],
  [new Date(2020, 11, 3, 6), 11500],
  [new Date(2020, 11, 3, 9), 16000],
  [new Date(2020, 11, 3, 12), 17500],
  [new Date(2020, 11, 3, 15), 18500],
  [new Date(2020, 11, 3, 18), 19000],
  [new Date(2020, 11, 3, 21), 21500],
  [new Date(2020, 11, 3, 24), 19500],
  [new Date(2020, 11, 4, 1), 19000],
  [new Date(2020, 11, 4, 3), 22500],
  [new Date(2020, 11, 4, 6), 23500],
  [new Date(2020, 11, 4, 9), 14000],
  [new Date(2020, 11, 4, 12), 22500],
  [new Date(2020, 11, 4, 15), 25000],
  [new Date(2020, 11, 4, 18), 26000],
  [new Date(2020, 11, 4, 21), 25000],
  [new Date(2020, 11, 4, 24), 27500],
  [new Date(2020, 11, 5, 1), 28000],
  [new Date(2020, 11, 5, 3), 19500],
  [new Date(2020, 11, 5, 6), 30500],
  [new Date(2020, 11, 5, 9), 31000],
  [new Date(2020, 11, 5, 12), 32500],
  [new Date(2020, 11, 5, 15), 33410],
  [new Date(2020, 11, 5, 21), 35500],
  [new Date(2020, 11, 5, 24), 23650],
  [new Date(2020, 11, 6, 1), 37000],
  [new Date(2020, 11, 6, 3), 38500],
  [new Date(2020, 11, 6, 6), 39500],
  [new Date(2020, 11, 6, 9), 40000],
  [new Date(2020, 11, 6, 12), 41500],
  [new Date(2020, 11, 6, 15), 42500],
  [new Date(2020, 11, 6, 18), 43000],
  [new Date(2020, 11, 6, 21), 44500],
  [new Date(2020, 11, 6, 24), 45500]
]

export const commitmentStatsData = [
  [
    { type: 'string', label: '' },
    { type: 'number', label: '' }
  ],
  ['MON', 2500],
  ['TUE', 1500],
  ['WED', 500],
  ['THU', 1800],
  ['FRI', 2000],
  ['SAT', 2500],
  ['SUN', 3000]
]

export const activity: DSOActivity = {
  _id: 'activity-id',
  invariant: 'Some activity',
  createdAt: '10-10-2020',
  user: 'user-id',
  identity: {
    individual,
    corporates: [corporate]
  }
}

export const fakeDepositAddress: DepositAddress = {
  account_id: 68,
  wallet_name: 'ZeroKey',
  asset_ticker: 'IX-RHTC ERC-20',
  deposit_address: '0xF5fC80766b57E0e1ff5D6b1861559a775F28cFB3',
  hd_path: "m/44'/60'/0'/0/0",
  depositQRCodeUrl:
    'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=0xF5fC80766b57E0e1ff5D6b1861559a775F28cFB3'
}
