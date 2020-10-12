import { user } from './user'
import { address, authorizationInfo } from './authorizer'
import {
  CorporateIdentity,
  IndividualIdentity,
  Declaration
} from 'v2/types/identity'
import declarations, {
  DeclarationValue
} from 'v2/app/pages/identity/const/declarations'
import { DataroomFile } from 'v2/types/dataroomFile'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'

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

export const checkedDeclarations: Declaration[] = [
  { a: DeclarationValue.Yes },
  { a: DeclarationValue.Yes }
]

export const unCheckedDeclarations: Declaration[] = [
  { a: DeclarationValue.Yes },
  { a: DeclarationValue.No }
]

export const createCorporateArgs: CorporateIdentityFormValues = {
  ...corporate,
  documents: [
    { title: '', label: '', type: '', document: documents[0] },
    { title: '', label: '', type: '', document: documents[1] }
  ],
  declarations: checkedDeclarations
}

export const updateCorporateArgs: CorporateIdentityFormValues = {
  ...corporate,
  documents: [
    { title: '', label: '', type: '', document: documents[0] },
    { title: '', label: '', type: '', document: documents[1] }
  ],
  declarations: checkedDeclarations
}
