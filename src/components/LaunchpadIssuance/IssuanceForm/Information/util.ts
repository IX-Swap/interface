import React from 'react'
import { InformationFormValues, OfferTokenType } from './types'

import {
  OfferIndustry,
  OfferNetwork,
  OfferTokenStandart,
  OfferDistributionFrequency,
  OfferInvestmentStructure,
} from 'state/launchpad/types'
import { SMART_CONTRACT_STRATEGIES } from 'components/LaunchpadIssuance/types'

export const getInitialValues = (smartContractStrategy?: SMART_CONTRACT_STRATEGIES) =>
  ({
    profilePicture: undefined,
    cardPicture: undefined,

    shortDescription: '',
    longDescription: '',

    title: '',

    companyIdNumber: '',

    investmentStructure: '',
    issuerIdentificationNumber: '',

    industry: undefined,
    investmentType: undefined,

    country: '',

    tokenName: '',
    tokenTicker: '',
    decimals: null,
    trusteeAddress: '',
    tokenType: '',

    network: undefined,

    hardCap: '',
    softCap: '',

    tokenPrice: '',
    tokenStandart: undefined,
    totalSupply: '',
    tokenReceiverAddress: '',

    minInvestment: '',
    maxInvestment: '',

    hasPresale: undefined,
    presaleAlocated: '',
    presaleMinInvestment: '',
    presaleMaxInvestment: '',

    images: [],
    videos: [{ url: null }],

    additionalDocuments: [{ file: null }],

    members: [
      {
        photo: null,
        name: '',
        role: '',
        about: '',
      },
    ],
    faq: [
      {
        question: '',
        answer: '',
      },
    ],

    allowOnlyAccredited: undefined,
    tokenomicsAgreement: undefined,

    terms: {
      investmentStructure: '',
    },

    timeframe: {
      whitelist: undefined,
      presale: undefined,
      sale: undefined,
      closed: undefined,
      claim: undefined,
    },

    social: [],

    website: '',
    whitepaper: '',
    email: '',
    smartContractStrategy,
  } as unknown as InformationFormValues)

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

export const investmentStructureOptions = [
  { label: 'Equity', value: OfferInvestmentStructure.equity },
  { label: 'Debt', value: OfferInvestmentStructure.debt },
  { label: 'Hybrid', value: OfferInvestmentStructure.hybrid },
  { label: 'Others', value: OfferInvestmentStructure.other },
]

export const networkOptions = [
  // { label: 'Etherium', value: OfferNetwork.ethereum },
  { label: 'Polygon', value: OfferNetwork.polygon },
  // { label: 'Kovan', value: OfferNetwork.kovan },
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
export const tokenDecimalsOnOptions = [
  { label: 'On', value: true },
  { label: 'Off', value: false },
]
export const distributionFrequencyOptions = [
  { label: 'Monthly', value: OfferDistributionFrequency.monthly },
  { label: 'Quarterly', value: OfferDistributionFrequency.quarterly },
  { label: 'Semi-Annually', value: OfferDistributionFrequency.semiAnnually },
  { label: 'Annually', value: OfferDistributionFrequency.annually },
  { label: 'N/A', value: OfferDistributionFrequency.notApplicable },
  { label: 'Other', value: OfferDistributionFrequency.other },
]

export const getSetter = (onChange: (e: Partial<React.ChangeEvent<any>>) => void) => {
  return (name: string, value: any) =>
    onChange({
      target: { name, value },
    })
}
