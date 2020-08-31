import { Bank } from 'v2/types/bank'
import { APIServiceResponse } from 'v2/services/api/types'
import { CashDeposit } from 'v2/types/cashdeposit'
import { Asset } from 'v2/types/asset'
import { CorporateIdentity, IndividualIdentity } from 'v2/types/identity'
import { user } from '__fixtures__/user'
import { CashWithdrawal } from 'v2/types/cash-withdrawal'
import { Commitment } from 'v2/types/commitment'
import { DSWithdrawal } from 'v2/types/ds-withdrawal'
import { Dso } from 'v2/types/dso'

export const asset: Asset = {
  _id: '2',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  createdBy: 'Me',
  deleted: false,
  name: 'XXX',
  symbol: 'ø',
  description: '',
  type: 'Security',
  numberFormat: {
    currency: 'xXx'
  }
}

export const address = {
  city: 'Omsk',
  country: 'Russia',
  state: 'Siberia',
  line1: 'Address line 1',
  line2: 'Address line 2',
  postalCode: '123456'
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
  createdAt: '01-01-2000',
  address,
  asset
}

export const corporate: CorporateIdentity = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  documents: [],
  declarations: [],
  walletAddress: 'address',
  status: 'Authorized',
  beneficialOwners: [],
  companyAddress: address,
  companyLegalName: 'InvestaX',
  countryOfFormation: 'Singapore',
  dateOfIncorporation: '01-01-2000',
  directors: [],
  registrationNumber: '123456',
  representatives: [],
  user
}

export const individual: IndividualIdentity = {
  _id: '1',
  email: 'email@example.com',
  annualIncome: '100000',
  bankAccountName: bank.accountHolderName,
  bankAccountNumber: bank.bankAccountNumber,
  bankName: bank.bankName,
  contactNumber: '1234567890',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  countryOfResidence: 'Russia',
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
  politicallyExposed: false,
  sourceOfWealth: '___',
  status: 'Authorized',
  toArrangeCustody: true,
  walletAddress: '1234567890_',
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
  corporates: [],
  hold: 'hold',
  level: '1',
  memo: 'memo',
  status: 'Approved',
  recipientWallet: '0000000',
  individual,
  asset
}

export const cashWithdrawal: CashWithdrawal = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  user: 'user',
  amount: 100000,
  bank: 'bank',
  corporates: [],
  hold: 'hold',
  level: '1',
  memo: 'memo',
  status: 'Approved',
  bankAccount: bank,
  individual,
  asset
}

export const dso: Dso = {
  _id: '1',
  asset: 'asset',
  businessModel: 'business model',
  capitalStructure: 'capital structure',
  corporate: 'corporate',
  createdAt: '01-01-2000',
  createdBy: 'created by',
  currency: [],
  deleted: false,
  deploymentInfo: undefined,
  distributionFrequency: 'distribution frequency',
  dividendYeild: 1,
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
  logo: undefined,
  minimumInvestment: 100,
  pricePerUnit: 1,
  status: 'status',
  subscriptionDocument: 'subscription document',
  team: [],
  tokenName: 'token name',
  tokenSymbol: 'token symbol',
  totalFundraisingAmount: 100000,
  useOfProceeds: 'use of proceeds',
  policyBuilder: undefined
}

// export const commitment: Commitment = {
//   _id: '1',
//   createdAt: '01-01-2000',
//   updatedAt: '01-01-2000',
//   status: 'Approved',
//   individual,
//   corporates: [],
//   currency: asset,
//   createdBy: 'user',
// }

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
  asset
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
