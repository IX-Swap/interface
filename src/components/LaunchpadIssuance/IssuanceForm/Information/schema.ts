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
import { SMART_CONTRACT_STRATEGIES } from 'components/LaunchpadIssuance/types'
import { STRING_MIN, STRING_MAX, TEXT_MAX, TEXT_MIN } from 'components/LaunchpadIssuance/utils/TextField'

const fileSchema = yup.mixed()
const REQUIRED = 'Required'

//String sizes
const STRING_BIG = 1000

const getLongerThanOrEqual = (field: string, chars: number) => `${field} should have at least ${chars} characters`
const getHaveAtMost = (field: string, chars: number) => `${field} should have at most ${chars} characters`

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true

  return value[0].size <= 5 * 1024 * 1024
})

const requiredFileSchema = limitedSizeFileSchema.required(REQUIRED)

const countryCodes = getCodes()
const getStringNumberConstraint = (name: string): [string, string, any] => [
  'numberStringConstraint',
  `${name} should be a number!`,
  (value: string) => (value ? !isNaN(+value) : true),
]

const checkMaxGreaterThanMinimum = function (minimum: string, maximum: string) {
  if (!maximum || !minimum) {
    return true
  }

  if (Number(maximum) <= Number(minimum)) {
    return false
  }

  return true
}

const checkMinSmallerThanMaximum = function (minimum: string, maximum: string) {
  if (!maximum || !minimum) {
    return true
  }

  if (Number(minimum) >= Number(maximum)) {
    return false
  }

  return true
}

export const schema = yup.object().shape({
  shortDescription: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .min(TEXT_MIN, getLongerThanOrEqual('Short Description', TEXT_MIN))
    .max(150, getHaveAtMost('Short Description', 150)),

  longDescription: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .min(TEXT_MIN, getLongerThanOrEqual('Description', TEXT_MIN))
    .max(TEXT_MAX, getHaveAtMost('Description', TEXT_MAX)),

  title: yup
    .string()
    .nullable()
    .min(3, getLongerThanOrEqual('Name of issuance', 3))
    .max(STRING_MAX, getHaveAtMost('Name of issuance', STRING_MAX))
    .required(REQUIRED),

  network: yup.string().nullable().oneOf(Object.values(OfferNetwork)).required(REQUIRED),
  industry: yup.string().nullable().oneOf(Object.values(OfferIndustry)).required(REQUIRED),
  investmentType: yup.string().nullable().oneOf(Object.values(OfferInvestmentStructure)).required(REQUIRED),
  country: yup.string().nullable().oneOf(countryCodes, 'Select a country from the list').required(REQUIRED),

  issuerIdentificationNumber: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .min(8, getLongerThanOrEqual('Identification number', 8))
    .max(64, getHaveAtMost('Identification number', 64)),

  tokenType: yup.string().nullable().oneOf(Object.values(OfferTokenType)).required(REQUIRED),
  tokenName: yup
    .string()
    .nullable()
    .min(3, getLongerThanOrEqual('Token name', 3))
    .max(64, getLongerThanOrEqual('Token name', 64))
    .required(REQUIRED),
  tokenTicker: yup
    .string()
    .nullable()
    .min(STRING_MIN, getLongerThanOrEqual('Token symbol', STRING_MIN))
    .max(6, 'Token symbol should be at most 6 charachters')
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z\d]+$/, { message: 'Please enter only letters and numbers, min 1 letter' })
    .required(REQUIRED),
  tokenPrice: yup
    .string()
    .nullable()
    .test('notZero', 'Token price should be bigger than 0!', function () {
      const { originalValue } = this as any
      return !originalValue || +originalValue > 0
    })
    .required(REQUIRED),
  tokenStandart: yup.string().nullable().oneOf(Object.values(OfferTokenStandart)).required(REQUIRED),

  tokenReceiverAddress: yup
    .string()
    .when('tokenStandart', {
      is: OfferTokenStandart.erc20,
      then: yup.string().when('smartContractStrategy', {
        is: SMART_CONTRACT_STRATEGIES.original,
        then: yup
          .string()
          .nullable()
          .test('addressConstraint', 'Please enter a valid address', function () {
            return !this.parent.tokenReceiverAddress || Boolean(isEthChainAddress(this.parent.tokenReceiverAddress))
          })
          .required(REQUIRED),
      }),
    })
    .nullable(),

  totalSupply: yup
    .string()
    .when('tokenStandart', {
      is: OfferTokenStandart.erc20,
      then: yup.string().when('smartContractStrategy', {
        is: SMART_CONTRACT_STRATEGIES.original,
        then: yup
          .string()
          .nullable()
          .matches(/[0-9]+/, 'Invalid value')
          .required(REQUIRED),
      }),
    })
    .nullable(),

  decimals: yup.number().min(0).max(50).required(REQUIRED).nullable(),
  trusteeAddress: yup
    .string()
    .nullable()
    .when('smartContractStrategy', {
      is: SMART_CONTRACT_STRATEGIES.original,
      then: yup.string().test('addressConstraint', 'Please enter a valid address', function () {
        const { originalValue } = this as any
        return !originalValue || Boolean(isEthChainAddress(originalValue))
      }),
    })
    .when('tokenStandart', {
      is: OfferTokenStandart.xtokenlite,
      then: yup.string().required(REQUIRED),
    }),

  tokenAddress: yup
    .string()
    .when('smartContractStrategy', {
      is: function (str?: any) {
        return str !== SMART_CONTRACT_STRATEGIES.original
      },
      then: yup
        .string()
        .nullable()
        .test('addressConstraint', 'Please enter a valid address', function () {
          return Boolean(isEthChainAddress(this.parent.tokenAddress))
        })
        .required(REQUIRED),
    })
    .nullable(),

  softCap: yup
    .string()
    .nullable()
    .matches(/[0-9]+/, 'Invalid value')
    .required(REQUIRED)
    .test('softCapConstraint', 'Minimum amount to raise should be smaller than total amolunt', function ():
      | boolean
      | yup.ValidationError {
      return checkMaxGreaterThanMinimum(this.parent.softCap, this.parent.hardCap)
    }),
  hardCap: yup
    .string()
    .nullable()
    .matches(/[0-9]+/, 'Invalid value')
    .required(REQUIRED)
    .test('hardCapConstraint', 'Total amount to raise should be greater than minimum amount', function ():
      | boolean
      | yup.ValidationError {
      return checkMinSmallerThanMaximum(this.parent.softCap, this.parent.hardCap)
    }),

  minInvestment: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .test('minInvestmentConstraint', 'Minimum investment should be smaller than maximum investment', function ():
      | boolean
      | yup.ValidationError {
      return checkMinSmallerThanMaximum(this.parent.minInvestment, this.parent.maxInvestment)
    }),

  maxInvestment: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .test('maxInvestmentConstraint', 'Maximum investment should be greater than minimum investment', function ():
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
          'Maximum investment should be greater than minimum investment',
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
          'Minimum investment should be smaller than maximum investment',
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

  email: yup.string().nullable().required(REQUIRED).email('Enter a valid email'),
  website: yup.string().nullable().required(REQUIRED).url('Enter a valid URL'),
  whitepaper: yup.string().nullable().url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),
  tokenomicsAgreement: yup.boolean().oneOf([true], REQUIRED).required(REQUIRED),

  profilePicture: requiredFileSchema,
  cardPicture: requiredFileSchema,

  terms: yup.object().shape({
    investmentStructure: yup
      .string()
      .nullable()
      .min(STRING_MIN, getLongerThanOrEqual('Investment Structure', STRING_MIN))
      .max(STRING_MAX, getHaveAtMost('Investment Structure', STRING_MAX))
      .required(REQUIRED),
    dividentYield: yup
      .string()
      .nullable()
      .test(...getStringNumberConstraint('Divident Yield')),
    investmentPeriod: yup.number().nullable(),
    grossIrr: yup
      .string()
      .nullable()
      .test(...getStringNumberConstraint('Gross IRR')),
    distributionFrequency: yup.string().nullable().oneOf(Object.values(OfferDistributionFrequency)),
  }),

  faq: yup.array(
    yup.object().shape({
      question: yup
        .string()
        .nullable()
        .optional()
        .min(TEXT_MIN, getLongerThanOrEqual('Question', TEXT_MIN))
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
        .nullable()
        .optional()
        .min(TEXT_MIN, getLongerThanOrEqual('Answer', TEXT_MIN))
        .max(TEXT_MAX, getHaveAtMost('Answer', TEXT_MAX))
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
      photo: limitedSizeFileSchema.nullable(),
      name: yup.string().required(REQUIRED).nullable(),
      role: yup
        .string()
        .min(STRING_MIN, getLongerThanOrEqual('Team member position', STRING_MIN))
        .max(STRING_MAX, getHaveAtMost('Team member position', STRING_MAX))
        .required(REQUIRED)
        .nullable(),
      about: yup
        .string()
        .min(STRING_MIN, getLongerThanOrEqual('Team member description', STRING_MIN))
        .max(STRING_BIG, getHaveAtMost('Team member description', STRING_BIG))
        .required(REQUIRED)
        .nullable(),
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
      url: yup
        .string()
        .nullable()
        .min(STRING_MIN, getLongerThanOrEqual('Url', STRING_MIN))
        .max(STRING_BIG, getHaveAtMost('Url', STRING_BIG))
        .url('Enter a valid URL'),
    })
  ),

  social: yup
    .array(
      yup.object().shape({
        url: yup.string().nullable().url('Enter a valid URL'),
      })
    )
    .min(1, 'Add at least one social link'),
})

export const editSchema = yup.object().shape({
  profilePicture: requiredFileSchema,
  cardPicture: requiredFileSchema,
  shortDescription: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .min(TEXT_MIN, getLongerThanOrEqual('Short Description', TEXT_MIN))
    .max(150, getHaveAtMost('Short Description', 150)),
  longDescription: yup
    .string()
    .nullable()
    .required(REQUIRED)
    .min(TEXT_MIN, getLongerThanOrEqual('Description', TEXT_MIN))
    .max(TEXT_MAX, getHaveAtMost('Description', TEXT_MAX)),

  network: yup.string().nullable().oneOf(Object.values(OfferNetwork)).required(REQUIRED),
  industry: yup.string().nullable().oneOf(Object.values(OfferIndustry)).required(REQUIRED),
  investmentType: yup.string().nullable().oneOf(Object.values(OfferInvestmentStructure)).required(REQUIRED),
  country: yup.string().nullable().oneOf(countryCodes, 'Select a country from the list').required(REQUIRED),

  email: yup.string().nullable().required(REQUIRED).email('Enter a valid email'),
  website: yup.string().nullable().required(REQUIRED).url('Enter a valid URL'),
  whitepaper: yup.string().nullable().url('Enter a valid URL'),

  allowOnlyAccredited: yup.boolean(),
  tokenomicsAgreement: yup.boolean().oneOf([true], REQUIRED).required(REQUIRED),

  social: yup
    .array(
      yup.object().shape({
        url: yup.string().nullable().url('Enter a valid URL'),
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
      url: yup.string().nullable().url('Enter a valid URL'),
    })
  ),

  faq: yup.array(
    yup.object().shape({
      question: yup
        .string()
        .nullable()
        .optional()
        .min(TEXT_MIN, getLongerThanOrEqual('Question', TEXT_MIN))
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
        .nullable()
        .optional()
        .min(TEXT_MIN, getLongerThanOrEqual('Answer', TEXT_MIN))
        .max(TEXT_MAX, getHaveAtMost('Answer', TEXT_MAX))
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
      photo: limitedSizeFileSchema.nullable(),
      name: yup
        .string()
        .nullable()
        .min(STRING_MIN, getLongerThanOrEqual('Full Name', STRING_MIN))
        .max(STRING_MAX, getHaveAtMost('Full Name', STRING_MAX))
        .required(REQUIRED),
      role: yup
        .string()
        .nullable()
        .min(STRING_MIN, getLongerThanOrEqual('Team member position', STRING_MIN))
        .max(STRING_MAX, getHaveAtMost('Team member position', STRING_MAX))
        .required(REQUIRED),
      about: yup
        .string()
        .nullable()
        .min(STRING_MIN, getLongerThanOrEqual('Team member description', STRING_MIN))
        .max(STRING_BIG, getHaveAtMost('Team member description', STRING_BIG))
        .required(REQUIRED),
    })
  ),
})
