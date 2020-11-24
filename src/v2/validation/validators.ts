import { isAddress } from '@ethersproject/address'
import {
  CorporateDeclarations,
  DeclarationValue,
  IndividualDeclarations
} from 'v2/app/pages/identity/const/declarations'

const passwordPatterns = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]

export const passwordValidator = (value: string | null | undefined) => {
  if (value !== null && value !== undefined) {
    return passwordPatterns.every(pattern => pattern.test(value))
  }
  return false
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
