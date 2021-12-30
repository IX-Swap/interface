import React from 'react'
import { render } from 'test-utils'
import {
  BalanceDetails,
  BalanceDetailsProps
} from 'app/components/BalanceDetails'
import { balance } from '__fixtures__/balance'
import { LabelledValue } from 'components/LabelledValue'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('BalanceDetails', () => {
  const props: BalanceDetailsProps = { data: balance }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders title correctly', () => {
    const { container } = render(<BalanceDetails {...props} />)

    expect(container).toHaveTextContent(`${balance.name} (${balance.symbol})`)
  })

  it('renders LabelledValue with correct props', () => {
    render(<BalanceDetails {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Total Balance',
        value: props.data.balance,
        labelWeight: 'thin',
        row: true
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        label: 'On Hold Balance',
        value: props.data.onHold,
        labelWeight: 'thin',
        row: true
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Available Balance',
        value: props.data.available,
        labelWeight: 'thin',
        row: true
      },
      {}
    )
  })
})
