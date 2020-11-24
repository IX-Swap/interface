import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import {
  addressValidator,
  corporateAccreditedInvestorValidator,
  individualAccreditedInvestorValidator
} from 'v2/validation/validators'
import { DeclarationValue } from 'v2/app/pages/identity/const/declarations'

describe('addressValidator', () => {
  it('returns false if address is invalid', () => {
    expect(addressValidator(null)).toBe(false)
    expect(addressValidator(undefined)).toBe(false)
    expect(addressValidator('123')).toBe(false)
  })

  it('returns true if address is valid', () => {
    expect(addressValidator(withdrawalAddress.address)).toBe(true)
  })
})

describe('individualAccreditedInvestorValidator', () => {
  it('returns false if value is null or undefined', () => {
    expect(individualAccreditedInvestorValidator(null)).toBe(false)
    expect(individualAccreditedInvestorValidator(undefined)).toBe(false)
  })

  it('returns false if none of the required values marked as yes', () => {
    expect(
      individualAccreditedInvestorValidator({
        NetPersonalAssets: DeclarationValue.No,
        JointlyHeldAccount: DeclarationValue.No,
        IndividualIncome: DeclarationValue.No,
        IndividualFinancialAsset: DeclarationValue.No
      })
    ).toBe(false)
  })

  it('returns true if at least one of the required values marked as yes', () => {
    expect(
      individualAccreditedInvestorValidator({
        NetPersonalAssets: DeclarationValue.Yes,
        JointlyHeldAccount: DeclarationValue.No,
        IndividualIncome: DeclarationValue.No,
        IndividualFinancialAsset: DeclarationValue.No
      })
    ).toBe(true)

    expect(
      individualAccreditedInvestorValidator({
        NetPersonalAssets: DeclarationValue.No,
        JointlyHeldAccount: DeclarationValue.Yes,
        IndividualIncome: DeclarationValue.No,
        IndividualFinancialAsset: DeclarationValue.No
      })
    ).toBe(true)

    expect(
      individualAccreditedInvestorValidator({
        NetPersonalAssets: DeclarationValue.No,
        JointlyHeldAccount: DeclarationValue.No,
        IndividualIncome: DeclarationValue.Yes,
        IndividualFinancialAsset: DeclarationValue.No
      })
    ).toBe(true)

    expect(
      individualAccreditedInvestorValidator({
        NetPersonalAssets: DeclarationValue.No,
        JointlyHeldAccount: DeclarationValue.No,
        IndividualIncome: DeclarationValue.No,
        IndividualFinancialAsset: DeclarationValue.Yes
      })
    ).toBe(true)
  })
})

describe('corporateAccreditedInvestorValidator', () => {
  it('returns false if value is null or undefined', () => {
    expect(corporateAccreditedInvestorValidator(null)).toBe(false)
    expect(corporateAccreditedInvestorValidator(undefined)).toBe(false)
  })

  it('returns false if none of the required values marked as yes', () => {
    expect(
      corporateAccreditedInvestorValidator({
        AllBeneficiariesAreAccreditedInvestors: DeclarationValue.No,
        AllPartnersAreAccreditedInvestors: DeclarationValue.No,
        ShareholderIsAccreditedInvestor: DeclarationValue.No,
        NetAssets: DeclarationValue.No
      })
    ).toBe(false)
  })

  it('returns true if at least one of the required values marked as yes', () => {
    expect(
      corporateAccreditedInvestorValidator({
        AllBeneficiariesAreAccreditedInvestors: DeclarationValue.Yes,
        AllPartnersAreAccreditedInvestors: DeclarationValue.No,
        ShareholderIsAccreditedInvestor: DeclarationValue.No,
        NetAssets: DeclarationValue.No
      })
    ).toBe(true)

    expect(
      corporateAccreditedInvestorValidator({
        AllBeneficiariesAreAccreditedInvestors: DeclarationValue.No,
        AllPartnersAreAccreditedInvestors: DeclarationValue.Yes,
        ShareholderIsAccreditedInvestor: DeclarationValue.No,
        NetAssets: DeclarationValue.No
      })
    ).toBe(true)

    expect(
      corporateAccreditedInvestorValidator({
        AllBeneficiariesAreAccreditedInvestors: DeclarationValue.No,
        AllPartnersAreAccreditedInvestors: DeclarationValue.No,
        ShareholderIsAccreditedInvestor: DeclarationValue.Yes,
        NetAssets: DeclarationValue.No
      })
    ).toBe(true)

    expect(
      corporateAccreditedInvestorValidator({
        AllBeneficiariesAreAccreditedInvestors: DeclarationValue.No,
        AllPartnersAreAccreditedInvestors: DeclarationValue.No,
        ShareholderIsAccreditedInvestor: DeclarationValue.No,
        NetAssets: DeclarationValue.Yes
      })
    ).toBe(true)
  })
})
