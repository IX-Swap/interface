export const defaultKycType = {
  individualAccredited: false,
  individualAccreditedNot: false,
  corporateAccredited: false,
  corporateAccreditedNot: false,
}

export const initialTokenState = {
  id: null,
  allowDeposit: true,
  allowWithdrawal: true,
  address: '',
  ticker: '',
  logo: '',
  companyName: '',
  url: '',
  file: null,
  industry: null,
  country: null,
  atlasOneId: '',
  wrappedTokenAddress: '',
  description: '',
  active: null,
  featured: null,
  chainId: null,
  kycType: defaultKycType,
  kycTypeJson: defaultKycType,
}

export const initialIssuerState = {
  name: '',
  url: '',
  logo: '',
  filePath: '',
  file: null,
}

export const validateSecTokenFields = [
  'address',
  'chainId',
  'companyName',
  'country',
  'industry',
  'url',
  'ticker',
  'description',
]

export const industries = [
  { id: 1, name: 'Diverse Industries' },
  { id: 2, name: 'Real Estate' },
  { id: 3, name: 'Finance' },
  { id: 4, name: 'Technology' },
  { id: 5, name: 'Energy & Mining' },
  { id: 6, name: 'Collectibles' },
  { id: 7, name: 'Other' },
].sort((a, b) => a.name.localeCompare(b.name))
