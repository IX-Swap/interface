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
  }
}

export const initialIndividualKycFormData: IFormData = {
  info: {
    title: 'Personal Information',
    href: 'personal',
    passed: true,
    fields: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      nationality: null,
      citizenship: null,
      phoneNumber: '',
      email: '',
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
      state: '',
      postalCode: '',
    },
  },
  funds: {
    title: 'Source of Funds',
    href: 'funds',
    passed: false,
    fields: [],
  },
  investor: {
    title: 'Investor Status Declaration',
    href: 'investor',
    passed: false,
    value: true,
  },
  fatca: {
    title: 'FATCA',
    href: 'fatca',
    passed: false,
    fields: [],
  },
  optInRequirement: {
    title: 'Opt-in Requirement',
    href: 'optInRequirement',
    passed: false,
    fields: [],
  },
  tax: {
    title: 'Tax Declaration',
    href: 'tax',
    passed: false,
    value: true,
    fin: '',
  },
  upload: {
    title: 'Upload Documents',
    href: 'upload',
    passed: false,
    fields: {},
  },
}

export const genders = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
]

export const sourceOfFunds = [
  'Inheritance/Gifts',
  'Investments',
  'Interest/Dividends',
  'Inheritance/Gifts',
  'Investments',
  'Interest/Dividends',
  'Inheritance/Gifts',
  'Investments',
  'Interest/Dividends',
  'Inheritance/Gifts',
  'Investments',
  'Interest/Dividends',
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
