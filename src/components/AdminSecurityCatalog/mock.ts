import { CREATE_TOKEN_CHAINS } from 'constants/addresses'

export const initialTokenState = {
  id: null,
  address: '',
  ticker: '',
  logo: '',
  companyName: '',
  url: '',
  file: null,
  industry: '',
  country: '',
  atlasOneId: '',
  wrappedTokenAddress: '',
  description: '',
  active: null,
  featured: null,
  chainId: CREATE_TOKEN_CHAINS[0].id,
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
  'atlasOneId',
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
  { id: 6, name: 'Other' },
]
