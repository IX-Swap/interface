import React from 'react'
import { render } from 'test-utils'
import {
  EstimatedValue,
  EstimatedValueProps
} from 'app/pages/invest/components/EstimatedValue'
import { asset } from '__fixtures__/authorizer'
import { Form } from 'components/form/Form'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('EstimatedValue', () => {
  const props: EstimatedValueProps = { symbol: asset.symbol }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form defaultValues={{ totalAmount: 123 }}>
        <EstimatedValue {...props} />
      </Form>
    )
  })

  it('renders LabelledValue with correct props', () => {
    render(
      <Form defaultValues={{ totalAmount: 123 }}>
        <EstimatedValue {...props} />
      </Form>
    )

    expect(LabelledValue).toHaveBeenCalledTimes(1)
    expect(LabelledValue).toHaveBeenCalledWith(
      { label: 'Estimated Value', value: formatMoney(123, asset.symbol) },
      {}
    )
  })
})
