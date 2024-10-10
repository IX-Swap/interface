import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { ITokenData } from './types'

export const prepareFormData = (values: any, currentIssuerId: string) => {
  const formData = new FormData()

  if (!values.needsWhitelisting) {
    delete values.whitelistPlatform
    delete values.whitelistContractAddress
    delete values.whitelistFunction
  } else {
    formData.append('checkWhitelistFunction', 'ifWhitelisted')
  }

  for (const key in values) {
    if (key === 'logo') {
      formData.append(key, values[key], values[key].name)
    } else if (['country', 'industry', 'originalNetwork', 'network', 'whitelistPlatform'].includes(key)) {
      formData.append(key, values[key].value)
    } else if (key === 'kycType') {
      formData.append(key, JSON.stringify(values[key]))
    } else {
      formData.append(key, values[key])
    }
  }
  formData.append('issuerId', currentIssuerId)

  return formData
}

export const compareChanges = (values: ITokenData, compareEditPlayload: any) => {
  const payload = {} as any

  for (const [key, value] of Object.entries(values)) {
    if (key === 'logo') {
      if (value.name != compareEditPlayload.logo.name) {
        payload[key] = value
      }
    } else if (key === 'brokerDealerId') {
      continue
    } else if (['country', 'industry', 'originalNetwork', 'network', 'whitelistPlatform'].includes(key)) {
      if (compareEditPlayload[key] != value?.value) {
        payload[key] = value
      }
    } else if (key === 'kycType') {
      if (JSON.stringify(values[key]) != JSON.stringify(compareEditPlayload['kycTypeJson'])) {
        payload[key] = JSON.stringify(values[key])
      }
    } else {
      if (compareEditPlayload[key] && compareEditPlayload[key] == value) {
        continue
      } else {
        payload[key] = value
      }
    }
  }

  return payload
}

export const platforms = [
  { value: 'investax', label: 'XTokenLite' },
  { value: 'ixswap', label: 'XTokenProxy' },
] as any

export const kycType = {
  individualAccredited: false,
  individualAccreditedNot: false,
  corporateAccredited: false,
  corporateAccreditedNot: false,
}

export const initialValues: ITokenData = {
  ticker: '',
  logo: null,
  companyName: '',
  description: '',
  url: '',
  industry: null,
  country: null,
  brokerDealerId: 1,
  active: false,
  featured: false,
  allowDeposit: false,
  allowWithdrawal: false,
  chainId: SUPPORTED_TGE_CHAINS.MATIC,
  whitelistPlatform: null,
  needsWhitelisting: false,
  originalSymbol: '',
  originalName: '',
  originalDecimals: '',
  originalAddress: '',
  originalNetwork: null,
  symbol: '',
  decimals: 18,
  custodyVaultId: '',
  custodyAssetId: '',
  custodyAssetAddress: '',
  withdrawFee: '',
  withdrawFeeAddress: '',
  kycType,
  whitelistFunction: '',
  platformId: 4,
}
