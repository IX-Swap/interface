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
import { isEthChainAddress } from 'utils'

const fileSchema = yup.mixed()
const REQUIRED = 'Required'

//String sizes
const STRING_HUGE = 65535
const STRING_BIG = 1000
const STRING_NORMAL = 255
const STRING_SMALL = 10

const getLongerThanOrEqual = (field: string, chars: number) => `${field} should have at least ${chars} characters`
const getHaveAtMost = (field: string, chars: number) => `${field} should have at most ${chars} characters`

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true

  return value[0].size <= 5 * 1024 * 1024
})

const requiredFileSchema = limitedSizeFileSchema.required(REQUIRED)

const countryCodes = getCodes()

const checkMaxGreaterThanMinimum = function (minimum: string, maximum: string) {
  if (!maximum || !minimum) {
    return true
  }

  if (Number(maximum) < Number(minimum)) {
    return false
  }

  return true
}

const checkMinSmallerThanMaximum = function (minimum: string, maximum: string) {
  if (!maximum || !minimum) {
    return true
  }

  if (Number(minimum) > Number(maximum)) {
    return false
  }

  return true
}

export const schema = yup.object().shape({
  shortDescription: yup
    .string()
    .required(REQUIRED)
    .min(STRING_SMALL, getLongerThanOrEqual('Short Description', STRING_SMALL))
    .max(150, getHaveAtMost('Short Description', 150)),

  longDescription: yup
    .string()
    .required(REQUIRED)
    .min(STRING_SMALL, getLongerThanOrEqual('Description', STRING_SMALL))
    .max(STRING_HUGE, getHaveAtMost('Description', STRING_HUGE)),

  title: yup
    .string()
    .min(2, getLongerThanOrEqual('Name of issuance', 2))
    .max(STRING_NORMAL, getHaveAtMost('Name of issuance', STRING_NORMAL))
    .required(REQUIRED),

  network: yup.string().oneOf(Object.values(OfferNetwork)).required(REQUIRED),
  industry: yup.string().oneOf(Object.values(OfferIndustry)).required(REQUIRED),
  investmentType: yup.string().oneOf(Object.values(OfferInvestmentStructure)).required(REQUIRED),
  country: yup.string().required(REQUIRED).oneOf(countryCodes, 'Select a country from the list'),

  issuerIdentificationNumber: yup
    .string()
    .required(REQUIRED)
    .min(8, getLongerThanOrEqual('Identification number', 8))
    .max(64, getHaveAtMost('Identification number', 64)),

  tokenType: yup.string().oneOf(Object.values(OfferTokenType)).required(REQUIRED),
  tokenName: yup.string().required(REQUIRED),
  tokenTicker: yup
    .string()
    .required(REQUIRED)
    .min(2, getLongerThanOrEqual('Token symbol', 2))
    .max(6, 'Token symbol should be at most 6 charachters')
    .matches(/^[a-zA-Z]+$/, { message: 'Please enter only letters' }),
  tokenPrice: yup.string().required(REQUIRED),
  tokenStandart: yup.string().oneOf(Object.values(OfferTokenStandart)).required(REQUIRED),

  tokenReceiverAddress: yup
    .string()
    .when('tokenStandart', {
      is: OfferTokenStandart.erc20,
      then: yup.string().required(REQUIRED)
    })
    .test('addressConstraint', 'Please enter a valid address', function () {
      return Boolean(isEthChainAddress(this.parent.tokenReceiverAddress))
    })
    .matches(/0x[0-9a-fA-F]+/, { message: 'Enter a valid address' }),

  totalSupply: yup
    .string()
    .when('tokenStandart', {
      is: OfferTokenStandart.erc20,
      then: yup.string().required(REQUIRED)
    })
    .matches(/[0-9]+/, 'Invalid value'),

  decimals: yup.number().min(0).max(50),
  trusteeAddress: yup
    .string()
    .test('addressConstraint', 'Please enter a valid address', function () {
      return Boolean(isEthChainAddress(this.parent.trusteeAddress))
    })
    .matches(/0x[0-9a-fA-F]+/, { message: 'Enter a valid address' })
    .nullable(),

  tokenAddress: yup
    .string()
    .test('addressConstraint', 'Please enter a valid address', function () {
      return Boolean(isEthChainAddress(this.parent.tokenAddress))
    })
    .matches(/0x[0-9a-fA-F]+/, { message: 'Enter a valid address' })
    .nullable(),

  softCap: yup
    .string()
    .matches(/[0-9]+/, 'Invalid value')
    .required(REQUIRED)
    .test('softCapConstraint', 'Minimum amount to raise should be smaller than total amolunt', function ():
      | boolean
      | yup.ValidationError {
      return checkMaxGreaterThanMinimum(this.parent.softCap, this.parent.hardCap)
    }),
  hardCap: yup
    .string()
    .matches(/[0-9]+/, 'Invalid value')
    .required(REQUIRED)
    .test('hardCapConstraint', 'Total amount to raise should be greater than minimum amount', function ():
      | boolean
      | yup.ValidationError {
      return checkMinSmallerThanMaximum(this.parent.softCap, this.parent.hardCap)
    }),

  minInvestment: yup
    .string()
    .required(REQUIRED)
    .test('minInvestmentConstraint', 'Mininimal investment should be smaller than maximal investment', function ():
      | boolean
      | yup.ValidationError {
      return checkMinSmallerThanMaximum(this.parent.minInvestment, this.parent.maxInvestment)
    }),

  maxInvestment: yup
    .string()
    .required(REQUIRED)
    .test('maxInvestmentConstraint', 'Maximal investment should be greater than minimal investment', function ():
      | boolean
      | yup.ValidationError {
      return checkMaxGreaterThanMinimum(this.parent.minInvestment, this.parent.maxInvestment)
    })
    .test(
      'maxInvestmentHardCapConstraint',
      'Maximal investment should be smaller than total amount to raise',
      function (): boolean | yup.ValidationError {
        return checkMinSmallerThanMaximum(this.parent.maxInvestment, this.parent.hardCap)
      }
    ),
  hasPresale: yup.boolean().required(REQUIRED),

  presaleMaxInvestment: yup
    .string()
    .nullable()
    .when('hasPresale', {
      is: true,
      then: yup
        .string()
        .nullable()
        .required(REQUIRED)
        .test(
          'presaleMaxInvestmentConstraint',
          'Maximal investment should be greater than minimal investment',
          function (): boolean | yup.ValidationError {
            return checkMaxGreaterThanMinimum(this.parent.presaleMinInvestment, this.parent.presaleMaxInvestment)
          }
        )
        .test(
          'presaleMaxInvestmentAllocation',
          'Maximal investment should be smaller or equal to pre-sale allocation',
          function () {
            return checkMinSmallerThanMaximum(this.parent.presaleMaxInvestment, this.parent.presaleAlocated)
          }
        ),
      otherwise: yup.string().nullable(),
    }),
  presaleMinInvestment: yup
    .string()
    .nullable()
    .when('hasPresale', {
      is: true,
      then: yup
        .string()
        .nullable()
        .required(REQUIRED)
        .test(
          'presaleMinInvestmentConstraint',
          'Mininimal investment should be smaller than maximal investment',
          function (): boolean | yup.ValidationError {
            return checkMinSmallerThanMaximum(this.parent.presaleMinInvestment, this.parent.presaleMaxInvestment)
          }
        ),
      otherwise: yup.string().nullable(),
    }),

  presaleAlocated: yup
    .string()
    .nullable()
    .when('hasPresale', {
      is: true,
      then: yup
        .string()
        .nullable()
        .required(REQUIRED)
        .test(
          'presaleAlocatedMax',
          'Pre-sale allocated should be smaller or equal to total amount to raise',
          function () {
            return checkMinSmallerThanMaximum(this.parent.presaleAlocated, this.parent.hardCap)
          }
        ),
      otherwise: yup.string().nullable(),
    }),

  email: yup.string().required(REQUIRED).email('Enter a valid email'),
  website: yup.string().required(REQUIRED).url('Enter a valid URL'),
  whitepaper: yup.string().required(REQUIRED).url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),
  tokenomicsAgreement: yup.boolean().required(REQUIRED),

  profilePicture: requiredFileSchema,
  cardPicture: requiredFileSchema,

  terms: yup.object().shape({
    investmentStructure: yup
      .string()
      .min(2, getLongerThanOrEqual('Investment Structure', 2))
      .max(STRING_NORMAL, getHaveAtMost('Investment Structure', STRING_NORMAL))
      .required(REQUIRED),
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
        .min(STRING_SMALL, getLongerThanOrEqual('Question', STRING_SMALL))
        .max(STRING_BIG, getHaveAtMost('Question', STRING_BIG))
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
        .min(STRING_SMALL, getLongerThanOrEqual('Answer', STRING_SMALL))
        .max(STRING_HUGE, getHaveAtMost('Answer', STRING_HUGE))
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
      photo: limitedSizeFileSchema,
      name: yup.string().required(REQUIRED),
      role: yup
        .string()
        .min(2, getLongerThanOrEqual('Team member position', 2))
        .max(STRING_NORMAL, getHaveAtMost('Team member position', STRING_NORMAL))
        .required(REQUIRED),
      about: yup
        .string()
        .min(2, getLongerThanOrEqual('Team member description', 2))
        .max(STRING_BIG, getHaveAtMost('Team member description', STRING_BIG))
        .required(REQUIRED),
    })
  ),

  timeframe: yup.object().when('hasPresale', {
    is: true,
    then: yup.object().shape({
      whitelist: yup.date().nullable().required(REQUIRED),
      preSale: yup.date().nullable().required(REQUIRED),
      // using custom messages because we have two fields in one
      sale: yup.date().nullable().required('Public sale date required'),
      closed: yup.date().nullable().required('Closed date required'),
      claim: yup.date().nullable().required(REQUIRED),
    }),
    otherwise: yup.object().shape({
      whitelist: yup.date().nullable(),
      preSale: yup.date().nullable(),

      sale: yup.date().nullable().required('Public sale date required'),
      closed: yup.date().nullable().required('Closed date required'),
      claim: yup.date().nullable().required(REQUIRED),
    }),
  }),
  gallery: yup.array(requiredFileSchema),

  additionalDocuments: yup.array(
    yup.object().shape({
      file: fileSchema,
    })
  ),

  videos: yup.array(
    yup.object().shape({
      url: yup.string().url('Enter a valid URL'),
    })
  ),

  social: yup
    .array(
      yup.object().shape({
        url: yup.string().url('Enter a valid URL'),
      })
    )
    .min(1, 'Add at least one social link'),
})

export const editSchema = yup.object().shape({
  profilePicture: requiredFileSchema,
  cardPicture: requiredFileSchema,
  shortDescription: yup
    .string()
    .required(REQUIRED)
    .min(STRING_SMALL, getLongerThanOrEqual('Short Description', STRING_SMALL))
    .max(150, getHaveAtMost('Short Description', 150)),
  longDescription: yup
    .string()
    .required(REQUIRED)
    .min(STRING_SMALL, getLongerThanOrEqual('Description', STRING_SMALL))
    .max(STRING_HUGE, getHaveAtMost('Description', STRING_HUGE)),

  network: yup.string().oneOf(Object.values(OfferNetwork)).required(REQUIRED),
  industry: yup.string().oneOf(Object.values(OfferIndustry)).required(REQUIRED),
  investmentType: yup.string().oneOf(Object.values(OfferInvestmentStructure)).required(REQUIRED),
  country: yup.string().required(REQUIRED).oneOf(countryCodes, 'Select a country from the list'),

  email: yup.string().required(REQUIRED).email('Enter a valid email'),
  website: yup.string().required(REQUIRED).url('Enter a valid URL'),
  whitepaper: yup.string().required(REQUIRED).url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),
  tokenomicsAgreement: yup.boolean().required(REQUIRED),

  social: yup
    .array(
      yup.object().shape({
        url: yup.string().url('Enter a valid URL'),
      })
    )
    .min(1, 'Add at least one social link'),

  gallery: yup.array(requiredFileSchema),

  additionalDocuments: yup.array(
    yup.object().shape({
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
        .min(STRING_SMALL, getLongerThanOrEqual('Question', STRING_SMALL))
        .max(STRING_BIG, getHaveAtMost('Question', STRING_BIG))
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
        .min(STRING_SMALL, getLongerThanOrEqual('Answer', STRING_SMALL))
        .max(STRING_HUGE, getHaveAtMost('Answer', STRING_HUGE))
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
      photo: limitedSizeFileSchema,
      name: yup.string().required(REQUIRED),
      role: yup
        .string()
        .min(2, getLongerThanOrEqual('Team member position', 2))
        .max(STRING_NORMAL, getHaveAtMost('Team member position', STRING_NORMAL))
        .required(REQUIRED),
      about: yup
        .string()
        .min(2, getLongerThanOrEqual('Team member description', 2))
        .max(STRING_BIG, getHaveAtMost('Team member description', STRING_BIG))
        .required(REQUIRED),
    })
  ),
})
