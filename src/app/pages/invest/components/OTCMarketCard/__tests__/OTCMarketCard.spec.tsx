import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import {
  OTCMarketCard,
  OTCMarketCardProps
} from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'
import { CardCover } from 'app/pages/invest/components/OTCMarketCard/CardCover'
import { CardContent } from 'app/pages/invest/components/OTCMarketCard/CardContent'
import { PrimaryInvestLink } from 'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink'

jest.mock('app/pages/invest/components/OTCMarketCard/CardCover', () => ({
  CardCover: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/OTCMarketCard/CardContent', () => ({
  CardContent: jest.fn(() => null)
}))
jest.mock(
  'app/pages/invest/components/OTCMarketCard/PrimaryInvestLink',
  () => ({
    PrimaryInvestLink: jest.fn(() => null)
  })
)

describe('OTCMarketCard', () => {
  const primaryProps: OTCMarketCardProps = {
    data: dso,
    viewURL: 'foo',
    type: 'Primary'
  }

  const OTCProps: OTCMarketCardProps = {
    data: dso,
    viewURL: 'foo',
    type: 'OTC'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders CardCover with correct primaryProps', () => {
    render(<OTCMarketCard {...primaryProps} />)

    expect(CardCover).toHaveBeenCalledTimes(1)
    expect(CardCover).toHaveBeenCalledWith(
      {
        data: primaryProps.data,
        viewURL: primaryProps.viewURL,
        type: 'Primary'
      },
      {}
    )
  })

  it('renders CardCover with correct OTCProps', () => {
    render(<OTCMarketCard {...OTCProps} />)

    expect(CardCover).toHaveBeenCalledTimes(1)
    expect(CardCover).toHaveBeenCalledWith(
      {
        data: OTCProps.data,
        viewURL: OTCProps.viewURL,
        type: 'OTC'
      },
      {}
    )
  })

  it('renders CardContent with correct props', () => {
    render(<OTCMarketCard {...primaryProps} />)

    expect(CardContent).toHaveBeenCalledTimes(1)
    expect(CardContent).toHaveBeenCalledWith(
      { data: primaryProps.data, type: 'Primary' },
      {}
    )
  })

  it('renders PrimaryInvestLink with correct props', () => {
    render(<OTCMarketCard {...primaryProps} />)

    expect(PrimaryInvestLink).toHaveBeenCalledTimes(1)
    expect(PrimaryInvestLink).toHaveBeenCalledWith(
      { data: primaryProps.data, type: 'Primary' },
      {}
    )
  })
})
