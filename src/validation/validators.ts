import * as yup from 'yup'
import 'yup-phone'
import { isAddress } from '@ethersproject/address'
import isPast from 'date-fns/isPast'
import {
  CorporateDeclarations,
  DeclarationValue,
  IndividualDeclarations
} from 'app/pages/identity/const/declarations'
import { hasValue } from 'helpers/forms'

// TODO: Fix it when have free time
// TODO: When I put this schema into 'shared' file, we are getting an issue with circular references
const phoneSchema = (yup as any).string().required('Required').phone()

const passwordPatterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]

export const passwordValidator = {
  uppercaseLettersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[0].test(value)
    }

    return false
  },

  lowercaseLettersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[1].test(value)
    }

    return false
  },

  numbersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[2].test(value)
    }

    return false
  },

  specialCharactersTest: (value: string | null | undefined) => {
    if (hasValue<string>(value)) {
      return passwordPatterns[3].test(value)
    }

    return false
  }
}

export const addressValidator = (value: string | null | undefined) => {
  if (value !== null && value !== undefined) {
    return isAddress(value)
  }

  return false
}

export const individualAccreditedInvestorValidator = (
  value: Partial<IndividualDeclarations> | null | undefined
) => {
  if (value === null || value === undefined) {
    return false
  }

  const {
    NetPersonalAssets,
    IndividualIncome,
    IndividualFinancialAsset,
    JointlyHeldAccount
  } = value

  return (
    NetPersonalAssets === DeclarationValue.Yes ||
    IndividualFinancialAsset === DeclarationValue.Yes ||
    IndividualIncome === DeclarationValue.Yes ||
    JointlyHeldAccount === DeclarationValue.Yes
  )
}

export const corporateAccreditedInvestorValidator = (
  value: Partial<CorporateDeclarations> | null | undefined
) => {
  if (value === null || value === undefined) {
    return false
  }

  const {
    NetAssets,
    ShareholderIsAccreditedInvestor,
    AllPartnersAreAccreditedInvestors,
    AllBeneficiariesAreAccreditedInvestors
  } = value

  return (
    NetAssets === DeclarationValue.Yes ||
    ShareholderIsAccreditedInvestor === DeclarationValue.Yes ||
    AllPartnersAreAccreditedInvestors === DeclarationValue.Yes ||
    AllBeneficiariesAreAccreditedInvestors === DeclarationValue.Yes
  )
}

export const pastDateValidator = (value: string | null | undefined) => {
  if (value === undefined || value === null) {
    return false
  }

  return !isPast(new Date(value))
}

export const phoneNumberValidator = async (
  value: string | null | undefined
) => {
  if (value === undefined || value === null) {
    return false
  }

  return phoneSchema.isValid(value)
}
