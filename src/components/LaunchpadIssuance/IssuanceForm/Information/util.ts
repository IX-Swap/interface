import { OfferIndustry, OfferNetwork, OfferTokenStandart, OfferDistributionFrequency } from "state/launchpad/types"
import { InformationFormValues } from "./types"

export enum OfferTokenType {
  WIXS,
  WBTC,
  WETH,
  MATIC,
  USDC,
  USDT
}

export const initialValues = {
  profilePicture: undefined,
  cardPicture: undefined,
  shortDescription: '',
  longDescription: '',
  name: '',
  companyIdNumber: '',
  industry: undefined,
  investmentStructure: undefined,
  country: '',
  tokenName: '',
  tokenTicker: '',
  tokenType: '',
  network: undefined,
  hardCap: '',
  softcap: '',
  pricePerToken: 0,
  tokenStandart: undefined,
  minInvestment: '',
  maxInvestment: '',
  hasPresale: undefined,
  presaleAlocated: '',
  presaleMinInvestment: '',
  presaleMaxInvestment: '',
  additionalDocuments: [],
  members: [{ id: 0 }],
  faq: [{ id: 0 }],
  terms: {
    whitelist: undefined,
    presale: undefined,
    sale: undefined,
    claim: undefined
  }
} as unknown as InformationFormValues


export const industryOptions = [
  { label: 'Blockchain', value: OfferIndustry.blockchain },
  { label: 'Energy', value: OfferIndustry.energy },
  { label: 'Finance', value: OfferIndustry.finance },
  { label: 'Gaming', value: OfferIndustry.gaming },
  { label: 'Healthcare', value: OfferIndustry.healthcare },
  { label: 'Real Estate', value: OfferIndustry.realEstate },
  { label: 'Technology', value: OfferIndustry.technology },
  { label: 'Other', value: OfferIndustry.other },
]

export const networkOptions = [
  { label: 'Etherium', value: OfferNetwork.ethereum },
  { label: 'Polygon', value: OfferNetwork.polygon },
  { label: 'Kovan', value: OfferNetwork.kovan },
]

export const standardOptions = [
  { label: 'ERC20', value: OfferTokenStandart.erc20 },
  { label: 'XTokenLite', value: OfferTokenStandart.xtokenlite },
]

export const structureOptions = [
  { label: 'ERC20', value: OfferTokenStandart.erc20 },
  { label: 'XTokenLite', value: OfferTokenStandart.xtokenlite },
]

export const tokenTypeOptions = [
  { label: 'WIXS', value: OfferTokenType.WIXS },
  { label: 'WBTC', value: OfferTokenType.WBTC },
  { label: 'WETH', value: OfferTokenType.WETH },
  { label: 'MATIC', value: OfferTokenType.MATIC },
  { label: 'USDC', value: OfferTokenType.USDC },
  { label: 'USDT', value: OfferTokenType.USDT },
]

export const distributionFrequencyOptions = [
  { label: 'Monthly', value: OfferDistributionFrequency.monthly },
  { label: 'Quarterly', value: OfferDistributionFrequency.quarterly },
  { label: 'Annually', value: OfferDistributionFrequency.annually },
  { label: 'N/A', value: OfferDistributionFrequency.notApplicable },
  { label: 'Other', value: OfferDistributionFrequency.other },
]
