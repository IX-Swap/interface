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
  tradable: null,
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
  { id: 1, name: 'All Industries' },
  { id: 2, name: 'Diverse Industries' },
  { id: 3, name: 'Real Estate' },
  { id: 4, name: 'Finance' },
  { id: 5, name: 'Technology' },
  { id: 6, name: 'Energy & Mining' },
]
