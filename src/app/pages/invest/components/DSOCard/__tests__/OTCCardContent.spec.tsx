import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import {
  OTCCardContent,
  OTCCardContentProps
} from 'app/pages/invest/components/DSOCard/OTCCardContent'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

const defaultLabeledValueProps = {
  isRedesigned: true,
  item: true,
  reverse: true,
  labelColor: 'gray',
  labelFontSize: 14,
  valueFontSize: 14
}

describe('OTCCardContent', () => {
  const otc = { ...dso, raisedAmount: 1000, minimumTradeUnits: 5000 }
  const props: OTCCardContentProps = { data: { ...otc, tokenName: 'test' } }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Closing Date with correct props', () => {
    render(<OTCCardContent {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        ...defaultLabeledValueProps,
        label: 'Min. Trade Amount'
      }),
      {}
    )
  })

  it('renders Target Fundraise with correct props', () => {
    render(<OTCCardContent {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        ...defaultLabeledValueProps,
        align: 'right',
        reverse: true,
        label: 'Target Fundraise'
      }),
      {}
    )
  })
})
