import { renderIndividualOrCompanyName } from '../tables'
import { individual, corporate } from '__fixtures__/identity'
import { commitment, cashDeposit } from '__fixtures__/authorizer'

describe('renderIndividualOrCompanyName', () => {
  it('returns individual name for IndividualIdentity', () => {
    expect(renderIndividualOrCompanyName('Jane', individual)).toBe(
      `Jane ${individual.lastName}`
    )
  })

  it('returns representative name for CorporateIdentity', () => {
    expect(renderIndividualOrCompanyName('Jane', corporate)).toBe(
      `Jane ${corporate.representatives[0].lastName}`
    )
  })

  it('returns company name for CorporateIdentity if firstName is undefined', () => {
    expect(renderIndividualOrCompanyName(undefined, corporate)).toBe(
      `${corporate.companyLegalName}`
    )
  })

  it('returns individual name for Commitment', () => {
    expect(renderIndividualOrCompanyName('Jane', commitment)).toBe(
      `Jane ${commitment.identity.individual.lastName}`
    )
  })

  it('returns company name for Commitment if individual does not exist', () => {
    expect(
      renderIndividualOrCompanyName('Jane', {
        ...commitment,
        identity: {
          individual: undefined as any,
          corporates: commitment.identity.corporates
        }
      })
    ).toBe(`${commitment.identity.corporates[0].companyLegalName}`)
  })

  it('returns individual name for CashDeposit', () => {
    expect(renderIndividualOrCompanyName('Jane', cashDeposit)).toBe(
      `Jane ${cashDeposit.individual.lastName}`
    )
  })

  it('returns company name for CashDeposit if individual does not exist', () => {
    expect(
      renderIndividualOrCompanyName('Jane', {
        ...cashDeposit,
        individual: undefined as any,
        corporates: cashDeposit.corporates
      })
    ).toBe(`${cashDeposit.corporates[0].companyLegalName}`)
  })
})
