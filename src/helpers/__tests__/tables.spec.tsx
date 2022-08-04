import {
  getIndividualLastName,
  getCorporateLegalName,
  getCorporateRepresentativeName,
  renderIndividualOrCompanyName,
  renderBalance,
  renderUSDPrice,
  renderSGDPrice,
  renderCurrencyLabel,
  RenderBolderText,
  renderStatus
} from '../tables'
import { individual, corporate } from '__fixtures__/identity'
import { commitment, cashDeposit } from '__fixtures__/authorizer'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { network } from '__fixtures__/network'
import {
  CorporateIdentity,
  IndividualIdentity
} from 'app/pages/identity/types/forms'
import { render } from 'test-utils'
import { firstTableItems } from 'ui/UIKit/TablesKit/FirstTable/FirstTable'
import React from 'react'

describe('renderIndividualOrCompanyName', () => {
  it('returns individual name for IndividualIdentity', () => {
    expect(renderIndividualOrCompanyName('Jane', individual)).toBe(
      `Jane ${individual.lastName}`
    )
  })

  it('returns representative name for CorporateIdentity', () => {
    expect(renderIndividualOrCompanyName('Jane', corporate)).toBe('InvestaX')
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

  it('returns individual name for WithdrawalAddress', () => {
    const withdrawalAddress: WithdrawalAddress = {
      _id: 'id123',
      status: 'Approved',
      address: '0x67ed490d810c41263758e7355cef720ffed68cbc',
      identity: { individual, corporates: [corporate] },
      label: 'test label',
      network: network,
      memo: 'test memo',
      createdAt: '01-01-2000',
      updatedAt: '01-01-2000',
      authorizations: []
    }

    expect(renderIndividualOrCompanyName('Jane', withdrawalAddress)).toBe(
      `Jane ${withdrawalAddress.identity?.individual.lastName ?? ''}`
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

describe('getIndividualLastName', () => {
  it('returns empty string if individual is undefined', () => {
    expect(
      getIndividualLastName(undefined as unknown as IndividualIdentity)
    ).toBe('')
  })

  it('returns lastName of individual', () => {
    expect(getIndividualLastName(individual)).toBe(individual.lastName)
  })
})

describe('getCorporateLegalName', () => {
  it('returns empty string if corporate is undefined', () => {
    expect(
      getCorporateLegalName(undefined as unknown as CorporateIdentity)
    ).toBe('')
  })

  it('returns legalName of corporate', () => {
    expect(getCorporateLegalName(corporate)).toBe(corporate.companyLegalName)
  })
})

describe('getCorporateRepresentativeName', () => {
  it('returns empty string if corporate is undefined', () => {
    expect(
      getCorporateRepresentativeName(undefined as unknown as CorporateIdentity)
    ).toBe('')
  })

  it("returns first representative's lastName", () => {
    expect(getCorporateRepresentativeName(corporate)).toBe('')
  })
})

describe('renderBalance', () => {
  it('renders balance in correct way', () => {
    const { container } = render(<>{renderBalance('30', firstTableItems[0])}</>)

    expect(container).toMatchSnapshot()
  })
})
describe('renderSGDPrice', () => {
  it('renders SGD price in correct way', () => {
    const { container } = render(<>{renderSGDPrice('30')}</>)

    expect(container).toMatchSnapshot()
  })
})
describe('renderUSDPrice', () => {
  it('renders USD price in correct way', () => {
    const { container } = render(<>{renderUSDPrice('30')}</>)

    expect(container).toMatchSnapshot()
  })
})
describe('renderCurrencyLabel', () => {
  it('renders currency label', () => {
    const { container } = render(<>{renderCurrencyLabel('SGD')}</>)

    expect(container).toMatchSnapshot()
  })
})
describe('RenderBolderText', () => {
  it('renders bolder text', () => {
    const { container } = render(<>{RenderBolderText('test')}</>)

    expect(container).toMatchSnapshot()
  })
})

describe('renderStatus', () => {
  it('renders status with type', () => {
    const { container } = render(<>{renderStatus('Connected')}</>)

    expect(container).toMatchSnapshot()
  })
})
