import React from 'react'
import { render } from 'test-utils'
import { LabelledValue } from 'components/LabelledValue'
import { DSOPricingView } from 'app/components/DSO/DSOPreview/DSOPricingView'
import { dso } from '__fixtures__/authorizer'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSOPricingView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DSOPricingView dso={dso} />)
  })

  it('renders data correctly', () => {
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

  it('render null values correctly', () => {
    const editedDSO = {
      ...dso,
      totalFundraisingAmount: null,
      minimumInvestment: null
    }
    render(<DSOPricingView dso={editedDSO} />)

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Total Fundraising Amount',
        value: ''
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Minimum Investment',
        value: ''
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Total Units',
        value: 0
      },
      {}
    )
  })
})
