interface IFormData {
  [key: string]: {
    title: string
    href: string
    passed: boolean
    fields?: any
    value?: any
    fin?: string
    taxResidency?: string
    taxId?: string
    exceedsOneMillion?: boolean
    otherFunds?: string
    represent?: number
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
    passed: true,
    fields: {
      corporateName: '',
      legalEntityType: '',
      registrationNumber: '',
      country: '',
      otherLegalEntityType: '',
      businessActivity: '',
      entityType: '',
      isIncorporated: false,
    },
  },
  authorizedPersonnel: {
    title: 'Company Authorized Personnel',
    href: 'authorizedPersonnel',
    passed: false,
    fields: {
      fullName: '',
      designation: '',
      email: '',
      phone: '',
    },
  },
  address: {
    title: 'Address',
    href: 'address',
    passed: false,
    fields: {
      line1: '',
      line2: '',
      country: '',
      city: '',
    },
  },
  residentialAddress: {
    title: 'Residential Address',
    href: 'residentialAddress',
    passed: false,
    fields: {
      line1: '',
      line2: '',
      country: '',
      city: '',
    },
  },
  funds: {
    title: 'Source of Funds',
    href: 'funds',
    passed: false,
    fields: [],
    otherFunds: '',
  },
  corporate: {
    title: '',
    href: 'corporate',
    passed: false,
    value: true,
    represent: 0,
  },
  fatca: {
    title: 'FATCA',
    href: 'fatca',
    passed: false,
    value: true,
    taxId: '',
  },
  taxDeclaration: {
    title: 'Tax Declaration',
    href: 'tax-declaration',
    passed: false,
    fields: { taxCountry: '', identificationNumber: '' },
  },
  beneficialOwners: {
    title: 'Beneficial Owners Information',
    href: 'beneficial-owners',
    passed: false,
    fields: [{ fullName: '', shareholding: '', proofOfAddress: null, proofOfIdentity: null }],
  },
  upload: {
    title: 'Corporate Documents',
    href: 'upload',
    passed: false,
    fields: {},
  },
}

export const incomes = ['< 50,000', '50,000-100,000', '100,000-300,000', '> 300,000'].map((name, index) => ({
  id: ++index,
  name,
}))

export const genders = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 1, name: 'Other' },
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
].map((name, index) => ({ id: ++index, name }))

export const fatcaOptions = [
  'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus.',
  'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
].map((name, index) => ({ id: ++index, name }))

export const optInOptions = [
  'I give my consent to IC SG Pte Ltd dba InvestaX to treat me as an “Accredited Investor”',
  'I have been informed of and understand the consequences of my qualification as an Accredited Investor, in particular the reduced regulatory investor safeguards for Accredited Investors.',
  'I have been informed of and understand my right to opt out of the Accredited Investors status with InvestaX at any point in time.',
].map((name, index) => ({ id: ++index, name }))

export const empleymentStatuses = [
  'Legal Entity Status',
  'Public Company',
  'Private Company',
  'Limited Liability Company',
  'Partnership',
  'Limited Liability Partnership',
  'Society',
  'Trust',
  'Others (Please specify)',
].map((name, index) => ({ id: ++index, name }))

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
].map((name, index) => ({ id: ++index, name }))

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
].map((name, index) => ({ id: ++index, name }))

export const corporateSourceOfFunds = [
  'Salary',
  'Loan',
  'Property',
  'Investments',
  'Interest/Dividends',
  'Business revenue',
  'Others',
].map((name, index) => ({ id: ++index, name }))

export const representOptions = [
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

export const formInitialValues: IFormInitial = {
  firstName: '',
  middleName: '',
  lastName: '',
  birthDate: '',
  gender: null,
  nationality: null,
  citizenship: null,
  email: '',
  phoneNumber: '',
  line1: '',
  line2: '',
  country: null,
  city: '',
  funds: [],
  otherFunds: '',
  isAccreditedInvestor: true,
  exceedsOneMillion: true,
  isUSTaxPayer: true,
  taxId: '',
  occupation: '',
  employmentStatus: null,
  employer: '',
  income12Month: null,
  proofIdentityFile: null,
  proofAddressFile: null,
  proofAccreditationFile: null,
}
