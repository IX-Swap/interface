import {
  corporateAccreditedInvestorValidator,
  individualAccreditedInvestorValidator,
  pastDateValidator,
  uniqueIdentifierCodeLengthValidator,
  uniqueIdentifierCodeValidator
} from 'validation/validators'
import { DeclarationValue } from 'app/pages/identity/const/declarations'

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

describe('pastDateValidator', () => {
  it('returns false if date is null or undefined', () => {
    expect(pastDateValidator(null)).toBe(false)
    expect(pastDateValidator(undefined)).toBe(false)
  })

  it('returns false if date is past date', () => {
    expect(pastDateValidator('2020-11-10T15:59:00.000Z')).toBe(false)
  })

  it('returns true if date is future date', () => {
    expect(pastDateValidator('2100-11-10T15:59:00.000Z')).toBe(true)
  })
})

describe('uniqueIdentifierCodeLengthValidator', () => {
  it('returns correct message if value length less than 12', () => {
    expect(uniqueIdentifierCodeLengthValidator('12345678')).toBe(
      'Unique Identifier Code must be at least 12 characters'
    )
  })

  it('returns correct message if value length more than 32', () => {
    expect(
      uniqueIdentifierCodeLengthValidator('123456789012345678901234567890123')
    ).toBe('Unique Identifier Code must be at most 32 characters')
  })
})

describe('uniqueIdentifierCodeValidator', () => {
  it('returns true if value is undefined', () => {
    expect(uniqueIdentifierCodeValidator(undefined)).toBe(true)
  })

  it('returns true if value is null', () => {
    expect(uniqueIdentifierCodeValidator(null)).toBe(true)
  })

  it('returns true if value is empty string', () => {
    expect(uniqueIdentifierCodeValidator('')).toBe(true)
  })
})
