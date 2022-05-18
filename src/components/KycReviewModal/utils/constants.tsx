import dayjs from 'dayjs'

import { IdentityDocumentType } from 'pages/KYC/enum'

export type KycTypes = Array<{
  key: string
  label: string
  width?: Record<string, number>
  format?: (values: string) => string
}>

export const cynopsisKeys = [
  { key: 'cynopsis1', label: 'Cynopsis 1' },
  { key: 'cynopsis2', label: 'Cynopsis 2' },
  { key: 'cynopsis3', label: 'Cynopsis 3' },
  { key: 'cynopsis4', label: 'Cynopsis 4' },
  { key: 'cynopsis5', label: 'Cynopsis 5' },
  { key: 'cynopsis6', label: 'Cynopsis 6' },
  { key: 'cynopsis7', label: 'Cynopsis 7' },
  { key: 'cynopsis8', label: 'Cynopsis 8' },
  { key: 'cynopsis9', label: 'Cynopsis 9' },
  { key: 'cynopsis10', label: 'Cynopsis 10' },
]

export const corporateInfoKeys = [
  { key: 'corporateName', label: 'Corporate Name', width: { xs: 12, sm: 6, md: 4 } },
  { key: 'registrationNumber', label: 'Registration Number', width: { xs: 12, sm: 6, md: 4 } },
  { key: 'countryOfIncorporation', label: 'Country of Incorporation', width: { xs: 12, sm: 6, md: 4 } },
  {
    key: 'typeOfLegalEntity',
    label: 'Type Of Legal Entity',
    width: { xs: 12, sm: 6 },
  },
  { key: 'businessActivity', label: 'Business Activity', width: { xs: 12, sm: 6 } },
  {
    key: 'incorporationDate',
    label: 'Date of Incorporation',
    width: { xs: 12, sm: 6 },
    format: (value: string) => dayjs(value).format('DD/MM/YYYY'),
  },
  {
    key: 'incorporationExpiryDate',
    label: 'Date of Incorporation Expiry',
    width: { xs: 12, sm: 6 },
    format: (value: string) => dayjs(value).format('DD/MM/YYYY'),
  },
] as KycTypes

export const personalInfoKeys = [
  { key: 'firstName', label: 'First Name', width: { xs: 12, sm: 6, md: 4 } },
  { key: 'middleName', label: 'Middle Name', width: { xs: 12, sm: 6, md: 4 } },
  { key: 'lastName', label: 'Last Name', width: { xs: 12, sm: 6, md: 4 } },
  { key: 'gender', label: 'Gender', width: { xs: 12, sm: 6 } },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    width: { xs: 12, sm: 6 },
    format: (value: string) => dayjs(value).format('DD/MM/YYYY'),
  },
  { key: 'nationality', label: 'Nationality', width: { xs: 12, sm: 6 } },
  { key: 'citizenship', label: 'Citizenship', width: { xs: 12, sm: 6 } },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
    format: (value: string): string => `+${value}`,
    width: { xs: 12, sm: 6 },
  },
  { key: 'email', label: 'Email address: ', width: { xs: 12, sm: 6 } },
] as KycTypes

export const individualDocumentKeys = [
  {
    key: 'idType',
    label: 'Document Type',
    width: { xs: 12, sm: 6 },
    format: (value: string): string => {
      const key = value.replaceAll(' ', '_') as keyof typeof IdentityDocumentType
      return IdentityDocumentType[key]
    },
  },
  { key: 'idNumber', label: 'Document Number', width: { xs: 12, sm: 6 } },

  {
    key: 'idIssueDate',
    label: 'Document Issue Date',
    width: { xs: 12, sm: 6 },
    format: (value: string) => dayjs(value).format('DD/MM/YYYY'),
  },
  {
    key: 'idExpiryDate',
    label: 'Document Expiry Date',
    width: { xs: 12, sm: 6 },
    format: (value: string) => dayjs(value).format('DD/MM/YYYY'),
  },
]

export const companyAuthorizedPersonnelKeys = [
  { key: 'personnelName', label: 'Full Name', width: { xs: 12, sm: 6 } },
  { key: 'designation', label: 'Designation', width: { xs: 12, sm: 6 } },
  { key: 'email', label: 'Email address' },
  { key: 'phoneNumber', label: 'Phone Number', format: (value: string): string => `+${value}` },
]

export const addressKeys = [
  { key: 'address', label: 'Address', width: { xs: 12, sm: 6 } },
  { key: 'postalCode', label: 'Postal Code', width: { xs: 12, sm: 6 } },
  { key: 'city', label: 'City', width: { xs: 12, sm: 6 } },
  { key: 'country', label: 'Country', width: { xs: 12, sm: 6 } },
]

export const sourceOfFundsKeys = [
  { key: 'sourceOfFunds1', label: 'Inheritance/Gifts' },
  { key: 'sourceOfFunds2', label: 'Investments' },
  { key: 'sourceOfFunds3', label: 'Interest/Dividends' },
  { key: 'sourceOfFunds4', label: 'Interest/Dividends' },
  { key: 'sourceOfFunds5', label: 'Interest/Dividends' },
  { key: 'sourceOfFunds6', label: 'Investments' },
  { key: 'sourceOfFunds7', label: 'Interest/Dividends' },
  { key: 'sourceOfFunds8', label: 'Investments' },
  { key: 'sourceOfFunds9', label: 'Inheritance/Gifts' },
  { key: 'sourceOfFunds10', label: 'Inheritance/Gifts' },
]

export const investorStatusDeclarationKeys = [
  {
    key: 'investorStatusDeclaration1',
    label: 'An entity or corporation with net assets exceeding $10 million or its equivalent in foreign currency; or',
  },
  {
    key: 'investorStatusDeclaration2',
    label:
      'The trustee of a trust the subject matter of which exceeds $10 million or its equivalent in foreign currency; or',
  },
  { key: 'investorStatusDeclaration3', label: 'A corporation where all the shareholders are Accredited Investors; or' },
  {
    key: 'investorStatusDeclaration4',
    label:
      'A partnership (other than a limited liability partnership) where all the partners are Accredited Investors; or',
  },
  { key: 'investorStatusDeclaration5', label: 'A trust where all the beneficiaries are Accredited Investors; or' },
  {
    key: 'investorStatusDeclaration6',
    label:
      'A trust where all the settlors are Accredited Investors and have reserved to themselves all powers of investment and asset management functions under the trust, and have reserved to themselves the power to revoke the trust.',
  },
]

export const fatcaKeys = [
  {
    key: 'fatca1',
    label:
      'I confirm that I am a US citizen and/or resident in the US for tax purposes and my US federal taxpayer ID number (US TIN) is as follows: ',
  },
  {
    key: 'fatca2',
    label: 'I confirm that I am not a US citizen or resident in the US for tax purposes.  ',
  },
]

export const ocupationKeys = [
  { key: 'occupation', label: 'Occupation', width: { xs: 12, sm: 6 } },
  { key: 'employmentStatus', label: 'Employment Status', width: { xs: 12, sm: 6 } },
  { key: 'employer', label: 'Employer', width: { xs: 12, sm: 6 } },
  { key: 'income', label: 'Income in USD in preceding 12 months', width: { xs: 12, sm: 6 } },
]

export const optInRequirementKeys = [
  {
    key: 'optInRequirement1',
    label: 'I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “Accredited Investor”',
  },
  {
    key: 'optInRequirement2',
    label:
      'I have been informed of and understand the consequences of my qualification as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
  },
  {
    key: 'optInRequirement3',
    label:
      'I have been informed of and understand my right to opt out of the Accredited Investors status with InvestaX at any point in time.',
  },
]

export const taxDeclarationKeys = [
  {
    key: 'taxCountry',
    label: 'Country of TAX Residency',
  },
  {
    key: 'taxNumber',
    label: 'Tax Indentification Number',
  },
]

export const beneficialOwnersKeys = [
  {
    key: 'fullName',
    label: 'Full Name',
    width: { xs: 12, sm: 6 },
  },
  {
    key: 'shareholding',
    label: 'Percentage Shareholding',
    width: { xs: 12, sm: 6 },
  },
]
