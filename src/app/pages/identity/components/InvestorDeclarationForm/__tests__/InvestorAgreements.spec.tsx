import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('InvestorAgreements', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <InvestorAgreements type='corporate' />
      </Form>
    )
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

    expect(
      getByText(
        'An entity or corporation with net assets exceeding SGD 10 million or its equivalent in foreign currency; or'
      )
    ).toBeTruthy()
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

    expect(
      getByText(
        'My total net personal assets (including up to SGD 1 million of your primary residence) exceed SGD 2 million or its equivalent in foreign currency; or'
      )
    ).toBeTruthy()
  })
})
