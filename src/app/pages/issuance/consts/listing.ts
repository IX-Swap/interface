import { SecondaryListingFormValues } from 'app/pages/issuance/types/listings'

export const initialListingFormValues: SecondaryListingFormValues = {
  corporate: '',
  network: '',
  tokenName: '',
  launchDate: undefined as any,
  tokenSymbol: '',
  decimals: null,
  capitalStructure: '',
  currency: '',
  dso: ''
}

export enum LISTING_TYPES {
  OTC = 'OTC',
  EXCHANGE = 'Exchange',
  BOTH = 'Exchange/OTC'
}
