import { getNames } from 'country-list'
import Active from 'assets/images/newRightCheck.svg'
import InActive from 'assets/images/newReject.svg'
import PendingIcon from 'assets/images/newPending.svg'
import AddIcon from 'assets/images/newAdd.svg'

export const statusIconMapping = {
  created: AddIcon,
  pending: PendingIcon,
  wrapping: PendingIcon,
  approved: Active,
  rejected: InActive,
} as any

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

export const countries = getNames()
  .map((name, index) => ({ value: ++index, label: name }))
  .sort((a, b) => a.label.localeCompare(b.label))

export const industriesOption = [
  { value: 'Diverse Industries', label: 'Diverse Industries' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Energy & Mining', label: 'Energy & Mining' },
  { value: 'Collectibles', label: 'Collectibles' },
  { value: 'Other', label: 'Other' },
].sort((a, b) => a.value.localeCompare(b.value))

export const countriesOption = getNames()
  .map((name) => ({ value: name, label: name }))
  .sort((a, b) => a.label.localeCompare(b.label))
