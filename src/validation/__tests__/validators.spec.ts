import {
  corporateAccreditedInvestorValidator,
  individualAccreditedInvestorValidator,
  isBeforeDate,
  pastDateValidator,
  uniqueIdentifierCodeValidator
} from 'validation/validators'
import { DeclarationValue } from 'app/pages/identity/const/declarations'
import { ValidationError } from 'yup'

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
describe('isBeforeDate', () => {
  it('returns true if either date is null, undefined, or empty string', () => {
    expect(isBeforeDate(null, null)).toBe(true)
    expect(isBeforeDate(undefined, '')).toBe(true)
  })

  it('returns false if first date is after the second date', () => {
    expect(
      isBeforeDate('2020-11-10T15:59:00.000Z', '2020-10-10T15:59:00.000Z')
    ).toBe(false)
  })

  it('returns true if first date is before the second date', () => {
    expect(
      isBeforeDate('2020-11-10T15:59:00.000Z', '2100-11-10T15:59:00.000Z')
    ).toBe(true)
  })
})

describe('uniqueIdentifierCodeValidator', () => {
  it('returns instance of ValidationError with correct error message if value length less than 12', () => {
    expect(uniqueIdentifierCodeValidator('123')).toEqual(
      new ValidationError(
        'Unique Identifier Code must be at least 12 characters',
        '123',
        'uniqueIdentifierCode'
      )
    )
  })

  it('returns instance of ValidationError if value length more than 32', () => {
    expect(
      uniqueIdentifierCodeValidator('123456789012345678901234567890123')
    ).toEqual(
      new ValidationError(
        'Unique Identifier Code must be at most 32 characters',
        '123',
        'uniqueIdentifierCode'
      )
    )
  })

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
