import { Bank } from 'types/bank'
import { APIServiceResponse } from 'services/api/types'
import { CashDeposit } from 'types/cashDeposit'
import { Asset } from 'types/asset'
import { CorporateIdentity, IndividualIdentity } from 'types/identity'
import { user } from '__fixtures__/user'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { DigitalSecurityOffering, DSOInsight } from 'types/dso'
import { AuthorizationInfo } from 'types/authorizer'
import { Commitment } from 'types/commitment'
import { emptyFile } from '__fixtures__/file'
import { network } from './network'
import { withdrawalAddress } from './withdrawalAddress'

export const asset: Asset = {
  _id: '5f732c538a568b50914d8372',
  deleted: false,
  createdBy: '5f73240373d4ab4b15fc1b2e',
  symbol: 'SGD',
  name: 'Singapore Dollars',
  type: 'Currency',
  numberFormat: {
    currency: 'SGD'
  },
  createdAt: '2020-09-29T12:45:07.411Z',
  updatedAt: '2020-10-05T03:14:17.244Z',
  description: 'test asset description'
}

export const address = {
  city: 'Omsk',
  country: 'Russian Federation',
  state: 'Siberia',
  line1: 'Address line 1',
  line2: 'Address line 2',
  postalCode: '123456'
}

export const authorizationInfo: AuthorizationInfo = {
  authorizer: 'id',
  comment: '',
  sharedWithUser: false,
  timestamp: ''
}

export const corporate: CorporateIdentity = {
  _id: '1',

  logo: '',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  documents: [],
  declarations: [],
  status: 'Submitted',
  beneficialOwners: [],
  companyAddress: address,
  companyLegalName: 'InvestaX',
  countryOfFormation: 'Singapore',
  dateOfIncorporation: '01-01-2000',
  directors: [],
  registrationNumber: '123456',
  representatives: [],
  email: '',
  contactNumber: '',
  user,
  authorizationDocuments: [],
  authorization: authorizationInfo,
  authorizations: []
}

export const individual: IndividualIdentity = {
  photo: '',
  _id: '1',
  email: 'email@example.com',
  annualIncome: '100000',
  bankAccountName: '',
  bankAccountNumber: '',
  bankName: '',
  contactNumber: '1234567890',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  countryOfResidence: 'Russian Federation',
  dob: 'DOB',
  employer: 'InvestaX',
  employmentStatus: 'Employed',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'M',
  houseHoldIncome: '100000',
  industryOfEmployment: 'IT',
  maritalStatus: 'Married',
  middleName: '',
  nationality: 'Russian',
  occupation: 'Occupied',
  // politicallyExposed: false,
  sourceOfWealth: '___',
  status: 'Submitted',
  authorization: authorizationInfo,
  authorizationDocuments: [],
  authorizations: [],
  declarations: [],
  documents: [],
  address,
  user
}

export const dsWithdrawal: DSWithdrawal = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  user: 'user',
  amount: 100000,
  hold: 'hold',
  level: '1',
  memo: 'memo',
  status: 'Approved',
  recipientWallet: '0000000',
  asset,
  transaction: '',
  authorizationDocuments: [],
  authorization: authorizationInfo,
  authorizations: [],
  identity: {
    individual,
    corporates: []
  }
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

export const dso: DigitalSecurityOffering = {
  _id: '1',
  asset: 'asset',
  businessModel: 'business model',
  capitalStructure: 'capital structure',
  network: network._id,
  corporate,
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  createdBy: 'created by',
  currency: asset,
  deleted: false,
  deploymentInfo: undefined,
  distributionFrequency: 'distribution frequency',
  dividendYield: 1,
  documents: [],
  equityMultiple: 0,
  fundraisingMilestone: 'fundraising milestone',
  grossIRR: 0,
  interestRate: 1,
  introduction: 'introduction',
  investmentPeriod: 1,
  investmentStructure: 'investment structure',
  issuerName: 'issuer name',
  launchDate: '01-01-2000',
  leverage: 0,
  logo: '5f4f7d87f3e2c40bbab8a3f1',
  minimumInvestment: 100,
  pricePerUnit: 1,
  subscriptionDocument: emptyFile,
  team: [],
  tokenName: 'token name',
  tokenSymbol: 'token symbol',
  totalFundraisingAmount: 100000,
  useOfProceeds: 'use of proceeds',
  policyBuilder: undefined,
  user: user._id,
  authorizationDocuments: [],
  authorization: authorizationInfo,
  authorizations: [],
  identity: {
    individual,
    corporates: []
  },
  status: 'Approved',
  insight: dsoInsight
}

export const commitment: Commitment = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  status: 'Approved',
  currency: asset,
  createdBy: 'user',
  dso,
  identity: {
    individual,
    corporates: [corporate]
  },
  totalAmount: 0,
  authorizationDocuments: [],
  authorizationOverrides: [],
  authorizationOverride: undefined,
  authorization: undefined,
  authorizations: [],
  hold: 'dsadas',
  level: undefined,
  numberOfUnits: 0,
  pricePerUnit: 0,
  signedSubscriptionDocument: emptyFile,
  user,
  withdrawalAddress: withdrawalAddress
}

export const bank: Bank = {
  _id: '1',
  status: 'Approved',
  deleted: false,
  bankName: 'Rocketbank',
  bankAccountNumber: '1234567890',
  accountHolderName: 'Oleg Tinkoff',
  swiftCode: 'SWIFTCODE',
  authorized: true,
  authorizationDocuments: [],
  authorizations: [],
  supportingDocuments: [],
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  authorization: authorizationInfo,
  identity: {
    corporates: [corporate],
    individual
  },
  user,
  address,
  currency: asset
}

export const cashDeposit: CashDeposit = {
  _id: '1',
  amount: 10000,
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  depositCode: 'DEPOSIT',
  status: 'Approved',
  user: '???',
  bankAccount: bank,
  individual,
  corporates: [corporate],
  asset,
  identity: {
    individual,
    corporates: [corporate]
  },
  authorizations: [],
  authorizationDocuments: [],
  authorization: undefined
}

export const cashWithdrawal: CashWithdrawal = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  user: 'user',
  amount: 100000,
  corporates: [],
  hold: 'hold',
  level: '1',
  memo: 'memo',
  status: 'Approved',
  bank,
  individual,
  asset,
  identity: {
    individual,
    corporates: []
  },
  authorizations: [],
  authorizationDocuments: [],
  authorization: undefined
}

export const authorizerURLs = {
  approve: `/${bank._id}/approve`,
  reject: `/${bank._id}/reject`
}

export const approveResponseSuccess: APIServiceResponse = {
  message: 'Approved successfully',
  success: true
}

export const approveResponseFailure: APIServiceResponse = {
  message: 'Could not approve',
  success: false
}

export const rejectResponseSuccess: APIServiceResponse = {
  message: 'Rejected successfully',
  success: true
}

export const rejectResponseFailure: APIServiceResponse = {
  message: 'Could not reject',
  success: false
}
