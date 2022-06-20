import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import {
  corporateInvestorAgreementsMap,
  individualInvestorAgreementsMap
} from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/agreements'

describe('InvestorAgreements', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct data when type is corporate', () => {
    const { getByText } = render(
      <Form>
        <InvestorAgreements type='corporate' />
      </Form>
    )

    expect(
      getByText('I declare that I am "Corporate Accredited Investor"')
    ).toBeTruthy()

    for (const item of Object.values(corporateInvestorAgreementsMap)) {
      expect(getByText(item)).toBeTruthy()
    }
  })

  it('renders correct data when type is individual', () => {
    const { getByText } = render(
      <Form>
        <InvestorAgreements type='individual' />
      </Form>
    )

    expect(
      getByText('I declare that I am "Individual Accredited Investor"')
    ).toBeTruthy()

    for (const item of Object.values(individualInvestorAgreementsMap)) {
      expect(getByText(item)).toBeTruthy()
    }
  })
})
