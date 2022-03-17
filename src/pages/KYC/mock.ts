interface IFormData {
  [key: string]: {
    title: string
    href: string
    passed: boolean
  }
}

export const individualKycFormData: IFormData = {
  info: {
    title: 'Personal Information',
    href: 'personal',
    passed: true,
  },
  address: {
    title: 'Address',
    href: 'address',
    passed: false,
  },
  funds: {
    title: 'Source of Funds',
    href: 'funds',
    passed: false,
  },
  investor: {
    title: 'Investor Status Declaration',
    href: 'investor',
    passed: false,
  },
  fatca: {
    title: 'FATCA',
    href: 'fatca',
    passed: false,
  },
  employmentInformation: {
    title: 'Employment Information',
    href: 'employment-info',
    passed: false,
  },
  upload: {
    title: 'Upload Documents',
    href: 'upload',
    passed: false,
  },
}

export const initialCorporateKycFormData: IFormData = {
  info: {
    title: 'Corporate Information',
    href: 'info',
    passed: false,
  },
  authorizedPersonnel: {
    title: 'Company Authorized Personnel',
    href: 'authorizedPersonnel',
    passed: false,
  },
  address: {
    title: 'Address',
    href: 'address',
    passed: false,
  },
  residentialAddress: {
    title: 'Residential Address',
    href: 'residentialAddress',
    passed: false,
  },
  funds: {
    title: 'Source of Funds',
    href: 'funds',
    passed: false,
  },
  corporate: {
    title: '',
    href: 'corporate',
    passed: false,
  },
  investor: {
    title: 'Investor Status Declaration',
    href: 'investor',
    passed: false,
  },
  fatca: {
    title: 'FATCA',
    href: 'fatca',
    passed: false,
  },
  taxDeclaration: {
    title: 'Tax Declaration',
    href: 'tax-declaration',
    passed: false,
  },
  beneficialOwners: {
    title: 'Beneficial Owners Information',
    href: 'beneficial-owners',
    passed: false,
  },
  upload: {
    title: 'Corporate Documents',
    href: 'upload',
    passed: false,
  },
}

export const incomes = ['< 50,000', '50,000-100,000', '100,000-300,000', '> 300,000'].map((name, index) => ({
  value: ++index,
  label: name,
}))

export const genders = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
  { value: 3, label: 'Other' },
]

export const sourceOfFunds = [
  'Inheritance/Gifts',
  'Investments',
  'Interest/Dividends',
  'Property',
  'Allowances/Spouses',
  'Employment',
  'Pension',
  'Retirement Benefits',
  'Others',
].map((name, index) => ({ value: ++index, label: name }))

export const fatcaOptions = [
  'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus.',
  'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
].map((name, index) => ({ value: ++index, label: name }))

export const optInOptions = [
  'I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “Accredited Investor”',
  'I have been informed of and understand the consequences of my qualification as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
  'I have been informed of and understand my right to opt out of the Accredited Investors status with InvestaX at any point in time.',
].map((name, index) => ({ value: ++index, label: name }))

export const empleymentStatuses = [
  'Full-Time Employee',
  'Part-Time Employee',
  'Own Business',
  'Government Employee',
  'Freelancers',
  'Consultants',
  'Self-Employed',
].map((name, index) => ({ value: ++index, label: name }))

export const legalEntityTypes = [
  'Exempt Private Company Limited By Shares',
  'Limited (LTD)',
  'Limited Liability Compnay (LLC)',
  'Limited Liability Partnership (LLP)',
  'Limited Partnership (LPT)',
  'Private Company Limited My Shares (LTD)',
  'Proprietary Limited (PTY LTD)',
  'Public Company Limited By Guarantee',
  'Public Company Limited By Shares',
  'Public Limited Company (PLC)',
  'Others (Please specify)',
].map((name, index) => ({ value: ++index, label: name }))

export const entityTypes = [
  'Exempt Private Company Limited By Shares',
  'Limited (LTD)',
  'Limited Liability Compnay (LLC)',
  'Limited Liability Partnership (LLP)',
  'Limited Partnership (LPT)',
  'Private Company Limited My Shares (LTD)',
  'Proprietary Limited (PTY LTD)',
  'Public Company Limited By Guarantee',
  'Public Company Limited By Shares',
  'Public Limited Company (PLC)',
  'Others (Please specify)',
].map((name, index) => ({ value: ++index, label: name }))

export const corporateSourceOfFunds = [
  'Salary',
  'Loan',
  'Property',
  'Investments',
  'Interest/Dividends',
  'Business revenue',
  'Others',
].map((name, index) => ({ value: ++index, label: name }))

export const individualRepresentOptions = [
  'I am a person whose individual net worth or joint net worth with my spouse at the time of purchase exceeds US $1 million',
  'I am person who had an individual income in excess of US$200,000 in each of the two most recent years or joint income with my spouse in excess of US$300 000 in each of those years and has a reasonable expectation of reaching the same income level in the current year',
]

export const corporateRepresentOptions = [
  'I represent a bank licensed in The Bahamas, whether acting in its individual or fiduciary capacity',
  'I represent a broker-dealer or securities investment advisor licensed in The Bahamas and acting for its own account',
  'I represent an insurance company licensed in The Bahamas',
  'I represent a fund licensed in The Bahamas',
  'I am a person, other than an individual with total assets in excess of US $5 million  not formed for the specific purpose of acquiring the securities offered',
  'I represent an entity in which all of the equity owners are accredited investors',
]

interface IFormInitial {
  [key: string]: any
}

export const individualFormInitialValues: IFormInitial = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: null,
  gender: null,
  nationality: null,
  citizenship: null,
  email: '',
  phoneNumber: '',
  line1: '',
  line2: '',
  country: null,
  city: '',
  sourceOfFunds: [],
  otherFunds: '',
  accredited: -1,
  isUSTaxPayer: -1,
  usTin: '',
  occupation: '',
  employmentStatus: null,
  employer: '',
  income: null,
  proofOfIdentity: [],
  proofOfAddress: [],
  evidenceOfAccreditation: [],
}

export const corporateFormInitialValues: IFormInitial = {
  corporateName: '',
  typeOfLegalEntity: null,
  registrationNumber: '',
  countryOfIncorporation: null,
  otherEntity: '',
  businessActivity: '',
  incorporated: false,
  personnelName: '',
  designation: '',
  email: '',
  phoneNumber: '',
  authorizationDocuments: [],
  line1: '',
  line2: '',
  country: null,
  city: '',
  residentialAddressLine1: '',
  residentialAddressLine2: '',
  residentialAddressCountry: null,
  residentialAddressCity: '',
  sourceOfFunds: [],
  otherFunds: '',
  accredited: -1,
  isUSTaxPayer: -1,
  usTin: '',
  taxCountry: null,
  taxNumber: '',
  beneficialOwners: [{ fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null }],
  corporateDocuments: [],
  financialDocuments: [],
  evidenceOfAccreditation: [],
  removedDocuments: [],
  removedBeneficialOwners: [],
}
