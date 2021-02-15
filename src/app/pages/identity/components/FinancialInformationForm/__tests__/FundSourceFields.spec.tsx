import { FundSourceFields } from 'app/pages/identity/components/FinancialInformationForm/FundSourceFields'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FundSourceFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form
        defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}
      >
        <FundSourceFields />
      </Form>
    )
  })

  it('renders fields fundSource fields correctly', () => {
    const { getByLabelText } = render(
      <Form
        defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}
      >
        <FundSourceFields />
      </Form>
    )

    expect(getByLabelText('Inheritance/Gift')).toBeInTheDocument()
    expect(getByLabelText('Interest/Dividend')).toBeInTheDocument()
    expect(getByLabelText('Property')).toBeInTheDocument()
    expect(getByLabelText('Allowance/Spousal Income')).toBeInTheDocument()
    expect(getByLabelText('Employment')).toBeInTheDocument()
    expect(getByLabelText('Pension')).toBeInTheDocument()
    expect(getByLabelText('Retirement Benifits')).toBeInTheDocument()
    expect(getByLabelText('Others')).toBeInTheDocument()
  })

  it('renders fields fundSource fields correctly', () => {
    const { container } = render(
      <Form
        defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}
      >
        <FundSourceFields />
      </Form>
    )

    const inheritanceSlider = container.querySelector(
      'input[name="fundSource[0].value"]'
    )
    expect(inheritanceSlider).toBeInTheDocument()
    expect(inheritanceSlider).toHaveValue('0')

    const interestSlider = container.querySelector(
      'input[name="fundSource[1].value"]'
    )
    expect(interestSlider).toBeInTheDocument()
    expect(interestSlider).toHaveValue('0')

    const propertySlider = container.querySelector(
      'input[name="fundSource[2].value"]'
    )
    expect(propertySlider).toBeInTheDocument()
    expect(propertySlider).toHaveValue('0')

    const allowanceSlider = container.querySelector(
      'input[name="fundSource[3].value"]'
    )
    expect(allowanceSlider).toBeInTheDocument()
    expect(allowanceSlider).toHaveValue('0')

    const employmentSlider = container.querySelector(
      'input[name="fundSource[4].value"]'
    )
    expect(employmentSlider).toBeInTheDocument()
    expect(employmentSlider).toHaveValue('0')

    const pensionSlider = container.querySelector(
      'input[name="fundSource[5].value"]'
    )
    expect(pensionSlider).toBeInTheDocument()
    expect(pensionSlider).toHaveValue('0')

    const retirementSlider = container.querySelector(
      'input[name="fundSource[6].value"]'
    )
    expect(retirementSlider).toBeInTheDocument()
    expect(retirementSlider).toHaveValue('0')

    const othersSlider = container.querySelector(
      'input[name="fundSource[7].value"]'
    )
    expect(othersSlider).toBeInTheDocument()
    expect(othersSlider).toHaveValue('0')
  })

  it('renders fundMajority field correctly', () => {
    const { getByText } = render(
      <Form
        defaultValues={getIdentityFormDefaultValue(undefined, 'individual')}
      >
        <FundSourceFields />
      </Form>
    )

    expect(
      getByText(
        'Will these source(s) be used to fund majority of your account?'
      )
    ).toBeInTheDocument()
    expect(getByText('Yes')).toBeInTheDocument()
    expect(getByText('No')).toBeInTheDocument()
  })
})
