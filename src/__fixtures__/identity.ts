import { user } from './user'
import { address, bank } from './authorizer'
import { CorporateIdentity, IndividualIdentity } from 'v2/types/identity'
import declarations from 'v2/app/pages/identity/const/declarations'
import { Document } from 'v2/types/document'

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
  toArrangeCustody: true,
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
  status: 'Authorized',
  toArrangeCustody: true,
  walletAddress: '1234567890_',
  declarations: declarations.individual.map(({ key }) => ({
    [key]: undefined
  })),
  documents: [],
  address,
  user
}

export const document: Document = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  originalFileName: 'documentfile1',
  title: 'Document 1',
  type: 'doctype1',
  user: user._id,
  url: 'https://docurl/'
}

export const documents: Document[] = [
  { ...document, _id: '1' },
  { ...document, _id: '2' }
]
