import { CREATE_TOKEN_CHAINS } from 'constants/addresses'

export const initialTokenState = {
  id: null,
  address: '',
  ticker: '',
  logo: '',
  companyName: '',
  url: '',
  file: null,
  industry: 'IT',
  country: 'KZ',
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
