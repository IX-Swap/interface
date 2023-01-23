import * as yup from 'yup'

import { countriesList } from 'constants/countriesList'

import { OfferDistributionFrequency, OfferIndustry, OfferInvestmentStructure, OfferNetwork, OfferTokenStandart, OfferType } from 'state/launchpad/types'
import { OfferTokenType } from './types'

const fileSchema = yup.mixed()

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true
  
  return value[0].size <= 5 * 1024 * 1024
})

const requriedFileSchema = limitedSizeFileSchema.required('File requried')

export const schema = yup.object().shape({
  shortDescription: yup.string().required(),
  longDescription: yup.string().required(),

  name: yup.string().required('Offer name required'),

  type: yup.string().oneOf(Object.values(OfferType)).required(),
  network: yup.string().oneOf(Object.values(OfferNetwork)).required(),
  industry: yup.string().oneOf(Object.values(OfferIndustry)).required(),
  investmentType: yup.string().oneOf(Object.values(OfferInvestmentStructure)).required(),

  issuerIdentificationNumber: yup.string().required(),
  country: yup.string().required().oneOf(countriesList, 'Select a country from the list'),

  tokenType: yup.string().oneOf(Object.values(OfferTokenType)).required(),
  tokenName: yup.string().required(),
  tokenTicker: yup.string().required(),
  tokenPrice: yup.string().required(),
  tokenStandart: yup.string().oneOf(Object.values(OfferTokenStandart)).required(),

  // investingTokenAddress: yup.string().matches(/0x[0-9a-fA-F]+/),
  // investingTokenSymbol: yup.string(),

  // decimals: yup.number(),

  softCap: yup.string().matches(/[0-9]+/).required(),
  hardCap: yup.string().matches(/[0-9]+/).required(),

  minInvestment: yup.string().required(),
  maxInvestment: yup.string().required(),

  hasPresale: yup.boolean().required(),

  presaleMaxInvestment: yup.string().when('hasPresale', { is: true, then: yup.string().required(), otherwise: yup.string() }),
  presaleMinInvestment: yup.string().when('hasPresale', { is: true, then: yup.string().required(), otherwise: yup.string() }),

  presaleAlocated: yup.string().when('hasPresale', { is: true, then: yup.string().required(), otherwise: yup.string() }),

  email: yup.string().required('Email required').email('Enter a valid email'),
  website: yup.string().required('Website URL required').url('Enter a valid URL'),
  whitepaper: yup.string().required('Whitepaper URL required').url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),

  profilePicture: requriedFileSchema,
  cardPicture: requriedFileSchema,
  
  terms: yup.object().shape({
    investmentStructure: yup.string().required(),
    dividentYield: yup.string(),
    investmentPeriod: yup.number(),
    grossIrr: yup.string(),
    distributionFrequency: yup.string().oneOf(Object.values(OfferDistributionFrequency))
  }),

  faq: yup.array(yup.object().shape({
    question: yup.string().required(),
    answer: yup.string().required()
  })),

  members: yup.array(yup.object().shape({
    avatar: requriedFileSchema,
    name: yup.string().required(),
    role: yup.string().required(),
    about: yup.string().required()
  })),

  timeframe: yup.object().when('hasPresale', {
    is: true,
    then: yup.object().shape({
      whitelist: yup.date().required(),
      presale: yup.date().required(),

      sale: yup.date().required(),
      closed: yup.date().required(),
      claim: yup.date().required()
    }),
    otherwise: yup.object().shape({
      whitelist: yup.date(),
      presale: yup.date(),

      sale: yup.date().required(),
      closed: yup.date().required(),
      claim: yup.date().required()
    })
  })
  ,

  gallery: yup.array(requriedFileSchema),

  additionalDocuments: yup.array(yup.object().shape({
    name: yup.string().when('file', { is: undefined, then: yup.string(), otherwise: yup.string().required() }),
    file: fileSchema
  })),

  videos: yup.array(yup.object().shape({
    url: yup.string().url('Enter a valid URL'),
  })),

  social: yup.array(yup.object().shape({
    url: yup.string().url('Enter a valid URL')
  })),
})