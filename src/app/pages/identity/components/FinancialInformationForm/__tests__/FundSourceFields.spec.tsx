import { FundSourceFields } from 'app/pages/identity/components/FinancialInformationForm/FundSourceFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { getFundSourceDefaults } from 'app/pages/identity/utils/individual/view'

describe('FundSourceFields', () => {
  const defaultValue = {
    sourceOfFund: getFundSourceDefaults()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders fundSource labels correctly', () => {
    const { container } = render(
      <Form>
        <FundSourceFields />
      </Form>
    )

    const sourceOfFundInput = container.querySelector(
      'input[name="sourceOfFund"]'
    ) as HTMLInputElement
    const otherSourceOfFundInput = container.querySelector(
      'input[name="otherSourceOfFund"]'
    ) as HTMLInputElement

    expect(sourceOfFundInput).toBeInTheDocument()
    expect(otherSourceOfFundInput).toBeInTheDocument()
  })

  it('renders Others field disabled if source of fund is not equal to Others', () => {
    const { container } = render(
      <Form defaultValues={{ sourceOfFund: 'Not Others' }}>
        <FundSourceFields />
      </Form>
    )

    const otherSourceOfFundInput = container.querySelector(
      'input[name="otherSourceOfFund"]'
    ) as HTMLInputElement
    expect(otherSourceOfFundInput).toBeDisabled()
  })
})
