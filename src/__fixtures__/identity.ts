import { user } from './user'
import { address, authorizationInfo } from './authorizer'
import {
  DeclarationValue,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import { DataroomFile } from 'types/dataroomFile'
import {
  DetailsOfIssuance,
  DetailsOfIssuanceFormValues
} from 'types/detailsOfIssuance'
import {
  CorporateIdentity,
  IndividualIdentity,
  IndividualIdentityFormValues,
  InvestorCorporateInfoFormValues
} from 'app/pages/identity/types/forms'

export const corporateInfoRequestPayload: InvestorCorporateInfoFormValues = {
  logo: undefined,
  companyLegalName: 'InvestaX',
  registrationNumber: '12345',
  legalEntityStatus: 'status',
  countryOfFormation: 'Singapore',
  companyAddress: address,
  mailingAddress: address,
  isMailingAddressSame: true,
  representatives: [
    {
      fullName: 'John Doe',
      designation: 'CEO',
      email: 'johnsemail',
      contactNumber: '+6512345678901',
      documents: []
    }
  ],
  numberOfBusinessOwners: '2',
  businessActivity: 'test',
  sourceOfFund: 'LOAN'
}

export const corporate: CorporateIdentity = {
  _id: '1',
  logo: '',
  type: 'investor',
  legalEntityStatus: 'others',
  isMailingAddressSame: false,
  createdAt: '01-01-2000',
  updatedAt: '01-01-2000',
  documents: [],
  taxResidencies: [],
  declarations: {
    agreements: {
      investor: false,
      custody: false,
      disclosure: false
    },
    tax: { fatca: false },
    investorsStatus: {
      jointlyHeldAccount: false,
      financialAsset: false,
      personalAssets: false,
      income: false,
      assets: false,
      optInAgreements: false,
      trustee: false,
      accreditedShareholders: false,
      partnership: false,
      accreditedBeneficiaries: false,
      accreditedSettlors: false,
      digitalSecurities: false,
      digitalSecuritiesIssuance: false,
      allServices: false,
      primaryOfferingServices: false
    }
  },
  status: 'Submitted',
  beneficialOwners: [],
  companyAddress: address,
  companyLegalName: 'InvestaX',
  directors: [],
  countryOfFormation: 'Russian Federation',
  registrationNumber: '123456',
  representatives: [
    {
      fullName: 'John Doe',
      designation: 'CEO',
      email: 'johnsemail',
      contactNumber: '+6512345678901',
      documents: [],
      address: address,
      percentageShareholding: 0
    }
  ],
  email: '',
  contactNumber: '',
  user,
  isInstitutionalInvestor: false,
  authorizationDocuments: [],
  authorization: authorizationInfo,
  authorizations: [],
  mailingAddress: address,
  createdBy: '12345',
  numberOfBusinessOwners: '1',
  businessActivity: '12',
  sourceOfFund: 'LOAN'
}

export const agreementsAndDisclosures = {
  investorAgreement: false,
  custodyAgreement: false,
  disclosures: false
}

export const individual: IndividualIdentity = {
  photo: '',
  _id: '1',
  taxResidencies: [
    { countryOfResidence: 'Singapore', residentOfSingapore: false }
  ],
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
  gender: 'Male',
  occupation: 'Occupied',
  // politicallyExposed: false,
  sourceOfWealth: '___',
  status: 'Submitted',
  authorization: authorizationInfo,
  authorizationDocuments: [],
  authorizations: [],
  declarations: {
    agreements: {
      investor: false,
      custody: false,
      disclosure: false
    },
    tax: { fatca: false },
    investorsStatus: {
      jointlyHeldAccount: false,
      financialAsset: false,
      personalAssets: false,
      income: false,
      optInAgreements: false,
      assets: false,
      trustee: false,
      accreditedShareholders: false,
      partnership: false,
      accreditedBeneficiaries: false,
      accreditedSettlors: false,
      digitalSecurities: false,
      digitalSecuritiesIssuance: false,
      allServices: false,
      primaryOfferingServices: false
    }
  },
  documents: [],
  address,
  user,
  sourceOfFund: 'LOAN',
  createdBy: '12345'
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
  ...agreementsAndDisclosures,
  documents: [{ value: documents[0] }, { value: documents[1] }],
  declarations: checkedDeclarations,
  taxResidencies: []
}

export const updateIndividualArgs: IndividualIdentityFormValues = {
  ...individual,
  ...agreementsAndDisclosures,
  documents: [{ value: documents[0] }, { value: documents[1] }],
  declarations: checkedDeclarations,
  taxResidencies: []
}

export const detailsOfIssuance: DetailsOfIssuance = {
  _id: '0',
  fullName: 'John Wick',
  companyName: 'Moogle',
  companyRegistrationNumber: '123456',
  createdAt: '34434',
  updatedAt: '43434',
  contactNumber: '+639571823',
  authorizations: [],
  email: 'john@moogle.org',
  industry: 'Commerce',
  fundRaisingAmount: 1234000,
  detail: 'Details here',
  documents: [
    { ...document, _id: '1', type: 'Company-Related Documents' },
    { ...document, _id: '2', type: 'Issuance-Related Documents' },
    { ...document, _id: '3', type: 'Financial Documents' }
  ],
  status: 'Submitted'
}

export const detailsOfIssuanceFormValues: DetailsOfIssuanceFormValues = {
  fullName: 'John Wick',
  companyName: 'Moogle',
  companyRegistrationNumber: '123456',
  contactNumber: '+639571823',
  email: 'john@moogle.org',
  industry: 'Commerce',
  fundRaisingAmount: 1234000,
  detail: 'Details here',
  companyRelated: [
    { ...document, _id: '1', type: 'Company-Related Documents' }
  ],
  issuanceRelated: [
    { ...document, _id: '2', type: 'Issuance-Related Documents' }
  ],
  financial: [{ ...document, _id: '3', type: 'Financial Documents' }]
}
