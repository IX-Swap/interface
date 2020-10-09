import { user } from './user'
import { address, authorizationInfo } from './authorizer'
import { CorporateIdentity, IndividualIdentity } from 'v2/types/identity'
import declarations from 'v2/app/pages/identity/const/declarations'
import { DataroomFile } from 'v2/types/dataroomFile'

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

export const document: DataroomFile = {
  _id: '1',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  originalFileName: 'documentfile1',
  title: 'Document 1',
  type: 'doctype1',
  user: user._id,
  url: 'https://docurl/'
}

export const documents: DataroomFile[] = [
  { ...document, _id: '1' },
  { ...document, _id: '2' }
]
