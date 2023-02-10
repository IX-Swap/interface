import * as yup from 'yup'

import { getCodes } from 'country-list'

import {
  OfferDistributionFrequency,
  OfferIndustry,
  OfferInvestmentStructure,
  OfferNetwork,
  OfferTokenStandart,
} from 'state/launchpad/types'
import { OfferTokenType } from './types'

const fileSchema = yup.mixed()

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true

  return value[0].size <= 5 * 1024 * 1024
})

const requriedFileSchema = limitedSizeFileSchema.required('File required')

const countryCodes = getCodes()

export const schema = yup.object().shape({
  shortDescription: yup
    .string()
    .required('Required')
    .min(10, 'Short Description must be longer than or equal to 10 characters'),
  longDescription: yup
    .string()
    .required('Required')
    .min(10, 'Description must be longer than or equal to 10 characters'),

  title: yup.string().required('Offer name required'),

  network: yup.string().oneOf(Object.values(OfferNetwork)).required('Network required'),
  industry: yup.string().oneOf(Object.values(OfferIndustry)).required('Industry required'),
  investmentType: yup.string().oneOf(Object.values(OfferInvestmentStructure)).required('Investment Type required'),
  country: yup.string().required('Country required').oneOf(countryCodes, 'Select a country from the list'),

  issuerIdentificationNumber: yup
    .string()
    .required('Enter company identification number')
    .min(8, 'Identification number should be at least 8 characters'),

  tokenType: yup.string().oneOf(Object.values(OfferTokenType)).required('Token type required'),
  tokenName: yup.string().required('Token name required'),
  tokenTicker: yup
    .string()
    .required('Token Ticker required')
    .min(2, 'Token symbol should at least 2 charachters')
    .max(6, 'Token symbol should be at most 6 charachters'),
  tokenPrice: yup.string().required('Enter token price'),
  tokenStandart: yup.string().oneOf(Object.values(OfferTokenStandart)).required('Token standart required'),

  // investingTokenAddress: yup.string().matches(/0x[0-9a-fA-F]+/),
  // investingTokenSymbol: yup.string(),

  // decimalsOn: yup.boolean(),
  decimals: yup.number().min(0).max(18),
  trusteeAddress: yup.string().matches(/0x[0-9a-fA-F]+/, { message: 'Enter a valid address' }),
  softCap: yup
    .string()
    .matches(/[0-9]+/, 'Invalid value')
    .required('Required'),
  hardCap: yup
    .string()
    .matches(/[0-9]+/, 'Invalid value')
    .required('Required'),

  minInvestment: yup
    .string()
    .required('Required')
    .test('minInvestmentConstraint', 'Mininimal investment should smaller than maximal investment', function ():
      | boolean
      | yup.ValidationError {
      if (!this.parent.maxInvestment || !this.parent.minInvestment) {
        return true
      }

      if (Number(this.parent.minInvestment) >= Number(this.parent.maxInvestment)) {
        return false
      }

      return true
    }),

  maxInvestment: yup
    .string()
    .required('Required')
    .test('maxInvestmentConstraint', 'Maximal investment should bigger than minimal investment', function (maximal):
      | boolean
      | yup.ValidationError {
      if (!this.parent.maxInvestment || !this.parent.minInvestment) {
        return true
      }

      if (Number(this.parent.maxInvestment) <= Number(this.parent.minInvestment)) {
        return false
      }

      return true
    }),

  hasPresale: yup.boolean().required('Required'),

  presaleMaxInvestment: yup
    .string()
    .when('hasPresale', { is: true, then: yup.string().required('Required'), otherwise: yup.string() }),
  presaleMinInvestment: yup
    .string()
    .when('hasPresale', { is: true, then: yup.string().required('Required'), otherwise: yup.string() }),

  presaleAlocated: yup
    .string()
    .when('hasPresale', { is: true, then: yup.string().required('Required'), otherwise: yup.string() }),

  email: yup.string().required('Email required').email('Enter a valid email'),
  website: yup.string().required('Website URL required').url('Enter a valid URL'),
  whitepaper: yup.string().required('Whitepaper URL required').url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),

  profilePicture: requriedFileSchema,
  cardPicture: requriedFileSchema,

  terms: yup.object().shape({
    investmentStructure: yup.string().required('Investment Structure required'),
    dividentYield: yup.string(),
    investmentPeriod: yup.number(),
    grossIrr: yup.string(),
    distributionFrequency: yup.string().oneOf(Object.values(OfferDistributionFrequency)),
  }),

  faq: yup.array(
    yup.object().shape({
      question: yup
        .string()
        .optional()
        .min(10, 'Question should be at least 10 charachters')
        .test('questionValidation', 'Question is required', function (): boolean | yup.ValidationError {
          if (
            this.parent.answer &&
            this.parent.answer.length > 0 &&
            (!this.parent.question || this.parent.question.length === 0)
          ) {
            return false
          }

          return true
        }),
      answer: yup
        .string()
        .optional()
        .min(10, 'Answer should be at least 10 charachters')
        .test('answerValidation', 'Answer is required', function (): boolean | yup.ValidationError {
          if (
            this.parent.question &&
            this.parent.question.length > 0 &&
            (!this.parent.answer || this.parent.answer.length === 0)
          ) {
            return false
          }

          return true
        }),
    })
  ),

  members: yup.array(
    yup.object().shape({
      photo: requriedFileSchema,
      name: yup.string().required('Required'),
      role: yup.string().required('Required'),
      about: yup.string().required('Required'),
    })
  ),

  timeframe: yup.object().when('hasPresale', {
    is: true,
    then: yup.object().shape({
      whitelist: yup.date().required('Required'),
      preSale: yup.date().required('Required'),

      sale: yup.date().required('Required'),
      closed: yup.date().required('Required'),
      claim: yup.date().required('Required'),
    }),
    otherwise: yup.object().shape({
      whitelist: yup.date(),
      preSale: yup.date(),

      sale: yup.date().required('Required'),
      closed: yup.date().required('Required'),
      claim: yup.date().required('Required'),
    }),
  }),
  gallery: yup.array(requriedFileSchema),

  additionalDocuments: yup.array(
    yup.object().shape({
      name: yup
        .string()
        .optional()
        .test('filenameValidation', 'Document name is required', function (): boolean | yup.ValidationError {
          return !this.parent.file || (this.parent.name && this.parent.name.length > 0)
        }),
      file: fileSchema,
    })
  ),

  videos: yup.array(
    yup.object().shape({
      url: yup.string().url('Enter a valid URL'),
    })
  ),

  social: yup.array(
    yup.object().shape({
      url: yup.string().url('Enter a valid URL'),
    })
  ),
})

export const editSchema = yup.object().shape({
  profilePicture: requriedFileSchema,
  cardPicture: requriedFileSchema,

  shortDescription: yup.string().required().min(10, 'Short Description must be longer than or equal to 10 characters'),
  longDescription: yup.string().required().min(10, 'Description must be longer than or equal to 10 characters'),

  network: yup.string().oneOf(Object.values(OfferNetwork)).required('Network required'),
  industry: yup.string().oneOf(Object.values(OfferIndustry)).required('Industry required'),
  investmentType: yup.string().oneOf(Object.values(OfferInvestmentStructure)).required('Investment Type required'),
  country: yup.string().required('Country required').oneOf(countryCodes, 'Select a country from the list'),

  email: yup.string().required('Email required').email('Enter a valid email'),
  website: yup.string().required('Website URL required').url('Enter a valid URL'),
  whitepaper: yup.string().required('Whitepaper URL required').url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),

  social: yup.array(
    yup.object().shape({
      url: yup.string().url('Enter a valid URL'),
    })
  ),

  gallery: yup.array(requriedFileSchema),

  additionalDocuments: yup.array(
    yup.object().shape({
      name: yup.string().when('file', { is: undefined, then: yup.string(), otherwise: yup.string().required() }),
      file: fileSchema,
    })
  ),

  videos: yup.array(
    yup.object().shape({
      url: yup.string().url('Enter a valid URL'),
    })
  ),

  faq: yup.array(
    yup.object().shape({
      question: yup
        .string()
        .optional()
        .min(10, 'Question should be at least 10 charachters')
        .test('questionValidation', 'Question is required', function (): boolean | yup.ValidationError {
          if (
            this.parent.answer &&
            this.parent.answer.length > 0 &&
            (!this.parent.question || this.parent.question.length === 0)
          ) {
            return false
          }

          return true
        }),
      answer: yup
        .string()
        .optional()
        .min(10, 'Answer should be at least 10 charachters')
        .test('answerValidation', 'Answer is required', function (): boolean | yup.ValidationError {
          if (
            this.parent.question &&
            this.parent.question.length > 0 &&
            (!this.parent.answer || this.parent.answer.length === 0)
          ) {
            return false
          }

          return true
        }),
    })
  ),

  members: yup.array(
    yup.object().shape({
      photo: requriedFileSchema,
      name: yup.string().required('Required'),
      role: yup.string().required('Required'),
      about: yup.string().required('Required'),
    })
  ),
})
