import { InvestorAgreements } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorAgreements/InvestorAgreements'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('InvestorAgreements', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
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
      getByText('I declare that I am corporate "Accredited Investor"')
    ).toBeTruthy()

    expect(
      getByText(
        'An entity or corporation with net assets exceeding $10 million or its equivalent in foreign currency; or'
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
      getByText('I declare that I am individual "Accredited Investor"')
    ).toBeTruthy()

    expect(
      getByText(
        'My total net personal assets (including up to SGD1 million of your primary residence) exceed SGD2 million or its equivalent in foreign currency; or'
      )
    ).toBeTruthy()
  })
})
