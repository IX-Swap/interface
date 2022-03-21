import { EmploymentField } from 'app/pages/identity/components/FinancialInformationForm/EmploymentFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'

describe('EmploymentField', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders fields correctly', () => {
    const { getByLabelText, queryAllByText, getByTestId } = render(
      <Form>
        <EmploymentField />
      </Form>
    )

    expect(getByTestId('Occupation-select')).toBeInTheDocument()
    // TODO: fix test
    expect(getByTestId('Employment-select')).toBeInTheDocument()
    expect(getByLabelText('Employer')).toBeInTheDocument()
    expect(queryAllByText('Annual Income')).toBeTruthy()
  })
})
