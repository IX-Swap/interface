import React from 'react'
import { render, cleanup } from 'test-utils'
import { LabelledValue } from 'components/LabelledValue'
import { DSOPricingView } from 'app/components/DSO/DSOPreview/DSOPricingView'
import { dso } from '__fixtures__/authorizer'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSOPricingView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOPricingView dso={dso} />)
  })

  it('render data correctly', () => {
    const editedDSO = {
      ...dso,
      totalFundraisingAmount: 100000,
      minimumInvestment: 25000
    }
    const { getByText } = render(<DSOPricingView dso={editedDSO} />)

    expect(getByText(/pricing/i)).toBeTruthy()
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Unit Price',
        value: '1.00 SGD'
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Total Fundraising Amount',
        value: '100,000 SGD'
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Minimum Investment',
        value: `25,000 ${dso.tokenSymbol}`
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Total Units',
        value: '100,000'
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Minimum Investment',
        value: '25,000 SGD'
      },
      {}
    )
  })
})
