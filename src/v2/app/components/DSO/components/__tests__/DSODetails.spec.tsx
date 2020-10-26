/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSODetails,
  DSODetailsProps
} from 'v2/app/components/DSO/components/DSODetails'
import { asset, dso } from '__fixtures__/authorizer'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSODetails', () => {
  const props: DSODetailsProps = { dso: dso, currency: asset }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSODetails {...props} />)
  })

  it('renders without error if dso.totalFundraisingAmount is null', () => {
    render(
      <DSODetails {...props} dso={{ ...dso, totalFundraisingAmount: null }} />
    )
  })

  it('renders without error if dso.minimumInvestment is null', () => {
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
        value: formatMoney(dso.pricePerUnit, props.currency?.symbol)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Total Fundraising Amount',
        value: formatMoney(dso.totalFundraisingAmount, props.currency?.symbol)
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
