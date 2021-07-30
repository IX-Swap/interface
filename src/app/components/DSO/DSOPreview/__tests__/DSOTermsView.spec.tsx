import { DSOTermsView } from 'app/components/DSO/DSOPreview/DSOTermsView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { LabelledValue } from 'components/LabelledValue'
import { dso } from '__fixtures__/authorizer'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('DSOTermsView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSOTermsView dso={dso} />)
  })

  it('render data correctly', () => {
    const { getByText } = render(<DSOTermsView dso={dso} />)

    expect(getByText(/offering terms/i)).toBeTruthy()

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Investment Period',
        value: dso.investmentPeriod
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Dividend Yield' }),
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Gross IRR (%)' }),
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Investment Structure',
        value: dso.investmentStructure
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Distribution Frequency',
        value: dso.distributionFrequency
      },
      {}
    )

    expect(LabelledValue).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Equity Multiple' }),
      {}
    )
  })
})
