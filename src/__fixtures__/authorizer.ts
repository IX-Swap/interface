import { Bank } from 'v2/types/bank'
import { APIServiceResponse } from 'v2/services/api/types'
import { CashDeposit } from 'v2/types/cashDeposit'
import { Asset } from 'v2/types/asset'
import { CorporateIdentity, IndividualIdentity } from 'v2/types/identity'
import { user } from '__fixtures__/user'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { declarations } from 'v2/app/pages/identity/const/declarations'
import { AuthorizationInfo } from 'v2/types/authorizer'
import { Commitment } from 'v2/types/commitment'
import { emptyFile } from '__fixtures__/file'

export const asset: Asset = {
  _id: '2',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  createdBy: 'Me',
  deleted: false,
  name: 'XXX',
  symbol: 'ø',
  description: 'test asset description',
  type: 'Security',
  numberFormat: {
    currency: 'xXx'
  }
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
  walletAddress: 'address',
  status: 'Submitted',
  beneficialOwners: [],
  companyAddress: address,
  companyLegalName: 'InvestaX',
  countryOfFormation: 'Singapore',
  dateOfIncorporation: '01-01-2000',
  directors: [],
  registrationNumber: '123456',
  representatives: [],
  toArrangeCustody: true,
  email: '',
  contactNumber: '',
  user: '',
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
  toArrangeCustody: true,
  walletAddress: '1234567890_',
  declarations: declarations.individual.map(({ key }) => ({
    [key]: undefined
  })),
  documents: [],
  address,
  user: ''
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

export const dso: DigitalSecurityOffering = {
  _id: '1',
  asset: 'asset',
  businessModel: 'business model',
  capitalStructure: 'capital structure',
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
  status: 'Approved'
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
    corporates: []
  },
  totalAmount: 0,
  authorizationDocuments: [],
  authorization: undefined,
  authorizations: [],
  hold: 'dsadas',
  level: undefined,
  numberOfUnits: 0,
  pricePerUnit: 0,
  signedSubscriptionDocument: '',
  user,
  walletAddress: ''
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
  corporates: [],
  asset,
  identity: {
    individual,
    corporates: []
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
