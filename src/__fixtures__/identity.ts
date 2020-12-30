import { user } from './user'
import { address, authorizationInfo } from './authorizer'
import { CorporateIdentity, IndividualIdentity } from 'types/identity'
import {
  DeclarationValue,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import { DataroomFile } from 'types/dataroomFile'
import { IndividualIdentityFormValues } from 'app/pages/identity/components/types'

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
  directors: [],
  countryOfFormation: 'Russian Federation',
  registrationNumber: '123456',
  representatives: [
    {
      contactNumber: '1234',
      countryOfResidence: 'Singapore',
      dob: '2020-12-12',
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'S'
    }
  ],
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
  contactNumber: '1234567890',
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  countryOfResidence: 'Russian Federation',
  dob: '01-01-2000',
  employer: 'InvestaX',
  employmentStatus: 'Employed',
  firstName: 'John',
  lastName: 'Doe',
  middleName: '',
  nationality: 'Russian',
  occupation: 'Occupied',
  // politicallyExposed: false,
  sourceOfWealth: '___',
  status: 'Submitted',
  authorization: authorizationInfo,
  authorizationDocuments: [],
  authorizations: [],
  declarations: [
    { IndividualAccreditedInvestor: DeclarationValue.Yes },
    { NetPersonalAssets: DeclarationValue.Yes },
    { IndividualIncome: DeclarationValue.Yes },
    { IndividualFinancialAsset: DeclarationValue.Yes },
    { JointlyHeldAccount: DeclarationValue.Yes },
    { InvestaXPrivacyPolicy: DeclarationValue.Yes },
    { InvestaXTermsOfUse: DeclarationValue.Yes },
    { USPerson: DeclarationValue.Yes },
    { TreatAsAccreditedInvestor: DeclarationValue.Yes },
    { PrimaryIssuancePlatform: DeclarationValue.Yes },
    { SecondaryTradingPlatform: DeclarationValue.Yes },
    { TrueAndCorrectInformation: DeclarationValue.Yes },
    { InformAnyChanges: DeclarationValue.Yes }
  ],
  documents: [],
  address,
  user
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

export const checkedDeclarations: IndividualDeclarations = {
  USPerson: DeclarationValue.Yes,
  TrueAndCorrectInformation: DeclarationValue.Yes,
  TreatAsAccreditedInvestor: DeclarationValue.Yes,
  PrimaryIssuancePlatform: DeclarationValue.Yes,
  NetPersonalAssets: DeclarationValue.Yes,
  JointlyHeldAccount: DeclarationValue.Yes,
  InvestaXTermsOfUse: DeclarationValue.Yes,
  InvestaXPrivacyPolicy: DeclarationValue.Yes,
  InformAnyChanges: DeclarationValue.Yes,
  IndividualIncome: DeclarationValue.Yes,
  IndividualFinancialAsset: DeclarationValue.Yes
}
export const unCheckedDeclarations: IndividualDeclarations = {
  USPerson: DeclarationValue.No,
  TrueAndCorrectInformation: DeclarationValue.No,
  TreatAsAccreditedInvestor: DeclarationValue.No,
  PrimaryIssuancePlatform: DeclarationValue.No,
  NetPersonalAssets: DeclarationValue.No,
  JointlyHeldAccount: DeclarationValue.No,
  InvestaXTermsOfUse: DeclarationValue.No,
  InvestaXPrivacyPolicy: DeclarationValue.No,
  InformAnyChanges: DeclarationValue.No,
  IndividualIncome: DeclarationValue.No,
  IndividualFinancialAsset: DeclarationValue.No
}

export const createIndividualArgs: IndividualIdentityFormValues = {
  ...individual,
  documents: [{ value: documents[0] }, { value: documents[1] }],
  declarations: checkedDeclarations
}

export const updateIndividualArgs: IndividualIdentityFormValues = {
  ...individual,
  documents: [{ value: documents[0] }, { value: documents[1] }],
  declarations: checkedDeclarations
}
