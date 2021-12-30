import React from 'react'
import { render } from 'test-utils'
import {
  DSODetails,
  DSODetailsProps
} from 'app/components/DSO/components/DSODetails'
import { dso } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSODetails', () => {
  const props: DSODetailsProps = { dso: dso }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSODetails {...props} />)
  })

  it.skip('renders without error if dso.totalFundraisingAmount is null', () => {
    render(
      <DSODetails {...props} dso={{ ...dso, totalFundraisingAmount: null }} />
    )
  })

  it.skip('renders without error if dso.minimumInvestment is null', () => {
    render(<DSODetails {...props} dso={{ ...dso, minimumInvestment: null }} />)
  })

  it('renders LabelledValue with correct props', () => {
    render(<DSODetails {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(5)
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Status', value: dso.status },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Capital Structure',
        value: dso.capitalStructure
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Unit Price',
        value: formatMoney(dso.pricePerUnit, dso.currency.symbol)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Total Fundraising Amount',
        value: formatMoney(dso.totalFundraisingAmount, dso.currency.symbol)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Minimum Investment',
        value: formatMoney(dso.minimumInvestment, dso.tokenSymbol)
      },
      {}
    )
  })
})
