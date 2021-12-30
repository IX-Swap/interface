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

  it.skip('renders without errors', () => {
    render(
      <Form defaultValues={defaultValue}>
        <FundSourceFields />
      </Form>
    )
  })

  it('renders fundSource labels correctly', () => {
    const { getByLabelText } = render(
      <Form defaultValues={defaultValue}>
        <FundSourceFields />
      </Form>
    )

    expect(getByLabelText('Inheritance/Gifts')).toBeInTheDocument()
    expect(getByLabelText('Investments')).toBeInTheDocument()
    expect(getByLabelText('Interest/Dividends')).toBeInTheDocument()
    expect(getByLabelText('Property')).toBeInTheDocument()
    expect(getByLabelText('Allowances/Spouse')).toBeInTheDocument()
    expect(getByLabelText('Employment')).toBeInTheDocument()
    expect(getByLabelText('Pension')).toBeInTheDocument()
    expect(getByLabelText('Retirement Benefits')).toBeInTheDocument()
    expect(getByLabelText('Others')).toBeInTheDocument()
  })

  it('renders fundSource sliders correctly', () => {
    const { container } = render(
      <Form defaultValues={defaultValue}>
        <FundSourceFields />
      </Form>
    )

    const inheritanceSlider = container.querySelector(
      'input[name="sourceOfFund[0].value"]'
    )
    expect(inheritanceSlider).toBeInTheDocument()
    expect(inheritanceSlider).toHaveValue('0')

    const interestSlider = container.querySelector(
      'input[name="sourceOfFund[1].value"]'
    )
    expect(interestSlider).toBeInTheDocument()
    expect(interestSlider).toHaveValue('0')

    const propertySlider = container.querySelector(
      'input[name="sourceOfFund[2].value"]'
    )
    expect(propertySlider).toBeInTheDocument()
    expect(propertySlider).toHaveValue('0')

    const allowanceSlider = container.querySelector(
      'input[name="sourceOfFund[3].value"]'
    )
    expect(allowanceSlider).toBeInTheDocument()
    expect(allowanceSlider).toHaveValue('0')

    const employmentSlider = container.querySelector(
      'input[name="sourceOfFund[4].value"]'
    )
    expect(employmentSlider).toBeInTheDocument()
    expect(employmentSlider).toHaveValue('0')

    const pensionSlider = container.querySelector(
      'input[name="sourceOfFund[5].value"]'
    )
    expect(pensionSlider).toBeInTheDocument()
    expect(pensionSlider).toHaveValue('0')

    const retirementSlider = container.querySelector(
      'input[name="sourceOfFund[6].value"]'
    )
    expect(retirementSlider).toBeInTheDocument()
    expect(retirementSlider).toHaveValue('0')

    const othersSlider = container.querySelector(
      'input[name="sourceOfFund[7].value"]'
    )
    expect(othersSlider).toBeInTheDocument()
    expect(othersSlider).toHaveValue('0')
  })
})
