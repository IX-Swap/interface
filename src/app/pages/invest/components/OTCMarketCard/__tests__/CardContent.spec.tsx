import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  CardContent,
  CardContentProps
} from 'app/pages/invest/components/OTCMarketCard/CardContent'
import { LabelledValue } from 'components/LabelledValue'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

const defaultLabeledValueProps = {
  item: true,
  labelFontSize: 14,
  valueFontSize: 16,
  labelWeight: 'default',
  valueWeight: 'custom'
}

describe('CardContent', () => {
  // TODO Remove this, add otc fixture after complete backend api endpoint
  const otc = { ...dso, raisedAmount: 1000, minimumTradeUnits: 5000 }
  const primaryProps: CardContentProps = { data: dso, type: 'Primary' }
  const OTCProps: CardContentProps = { data: otc, type: 'OTC' }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Closing Date with correct props when type is Primary', () => {
    render(<CardContent {...primaryProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        ...defaultLabeledValueProps,
        row: true,
        label: 'Closing Date:',
        value: dso.completionDate
      },
      {}
    )
  })

  it('renders Token Symbol with correct props when type is OTC', () => {
    render(<CardContent {...OTCProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        ...defaultLabeledValueProps,
        reverse: true,
        label: 'Token Symbol',
        value: dso.tokenSymbol
      },
      {}
    )
  })

  it('renders Expected Return with correct props when type is Primary', () => {
    render(<CardContent {...primaryProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        ...defaultLabeledValueProps,
        reverse: true,
        label: 'Expected Return',
        value: '0.00%'
      },
      {}
    )
  })

  it('renders Min. Trade Amount with correct props when type is OTC', () => {
    render(<CardContent {...OTCProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        ...defaultLabeledValueProps,
        reverse: true,
        label: 'Min. Trade Amount',
        value: `${otc.tokenSymbol} 5000`
      },
      {}
    )
  })

  it('renders Min. Investment Amount with correct props when type is Primary', () => {
    render(<CardContent {...primaryProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        ...defaultLabeledValueProps,
        reverse: true,
        label: 'Min. Investment Amount',
        value: 'SGD 100.00'
      },
      {}
    )
  })

  it('renders Target Fundraise with correct props when type is OTC', () => {
    render(<CardContent {...OTCProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        ...defaultLabeledValueProps,
        reverse: true,
        label: 'Target Fundraise',
        value: 'SGD 1,000.00'
      },
      {}
    )
  })

  it('renders Raised Amount with correct props when type is Primary', () => {
    render(<CardContent {...primaryProps} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      {
        ...defaultLabeledValueProps,
        reverse: true,
        label: 'Target Fundraise',
        value: 'SGD 100,000.00'
      },
      {}
    )
  })
})
