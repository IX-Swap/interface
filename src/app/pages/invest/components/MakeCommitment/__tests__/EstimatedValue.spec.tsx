import React from 'react'
import { render } from 'test-utils'
import {
  EstimatedValue,
  EstimatedValueProps
} from 'app/pages/invest/components/MakeCommitment/EstimatedValue'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'components/form/Form'

jest.mock('app/pages/invest/components/MakeCommitment/OverviewValue', () => ({
  OverviewValue: jest.fn(() => null)
}))

describe('EstimatedValue', () => {
  const props: EstimatedValueProps = { symbol: asset.symbol }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders  with correct props', () => {
    const { getByText } = render(
      <Form defaultValues={{ numberOfUnits: 100, pricePerUnit: 12 }}>
        <EstimatedValue {...props} />
      </Form>
    )

    expect(getByText('Investment amount:')).toBeTruthy()
    expect(getByText('SGD 1,200.00')).toBeTruthy()
  })
})
