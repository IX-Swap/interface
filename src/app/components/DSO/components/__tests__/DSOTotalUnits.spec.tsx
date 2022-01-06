import React from 'react'
import { render } from 'test-utils'
import { DSOTotalUnits } from 'app/components/DSO/components/DSOTotalUnits'
import { Form } from 'components/form/Form'

describe('DSOTotalUnits', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct data when totalFundraisingAmount and pricePerUnit have value more than 0', () => {
    const { getByText } = render(
      <Form defaultValues={{ totalFundraisingAmount: 100000, pricePerUnit: 5 }}>
        <DSOTotalUnits />
      </Form>
    )

    expect(getByText(/total units/i)).toBeInTheDocument()
    expect(getByText('20,000')).toBeInTheDocument()
  })

  it('renders null when totalFundraisingAmount or pricePerUnit is 0', () => {
    const { container } = render(
      <Form defaultValues={{ totalFundraisingAmount: 0, pricePerUnit: 0 }}>
        <DSOTotalUnits />
      </Form>
    )

    expect(container.querySelector('form')).toBeEmptyDOMElement()
  })
})
