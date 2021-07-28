import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { PriceChangesTable } from 'app/pages/home/components/SecurityTradingView/PriceChangesTable'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PriceChangesTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PriceChangesTable data={sampleSecurity} />)
  })

  it('renders correct value for priceChange24Hours', () => {
    const { getByText } = render(<PriceChangesTable data={sampleSecurity} />)

    expect(getByText('24 Hours')).toBeTruthy()
    expect(getByText('6.00%')).toBeTruthy()
  })

  it('does not render priceChange24Hours when value is null', () => {
    const { queryByText } = render(
      <PriceChangesTable
        data={{ ...sampleSecurity, priceChange24Hours: null }}
      />
    )

    expect(queryByText('6.00%')).toBeFalsy()
  })

  it('renders correct value for 1 Week', () => {
    const { getByText } = render(<PriceChangesTable data={sampleSecurity} />)

    expect(getByText('1 Week')).toBeTruthy()
    expect(getByText('8.00%')).toBeTruthy()
  })

  it('does not render 1 Week when value is null', () => {
    const { queryByText } = render(
      <PriceChangesTable data={{ ...sampleSecurity, priceChange1Week: null }} />
    )

    expect(queryByText('8.00%')).toBeFalsy()
  })

  it('renders correct value for 1 Month', () => {
    const { getByText } = render(<PriceChangesTable data={sampleSecurity} />)

    expect(getByText('1 Month')).toBeTruthy()
    expect(getByText('9.00%')).toBeTruthy()
  })

  it('does not render 1 Month when value is null', () => {
    const { queryByText } = render(
      <PriceChangesTable
        data={{ ...sampleSecurity, priceChange1Month: null }}
      />
    )

    expect(queryByText('9.00%')).toBeFalsy()
  })

  it('renders correct value for YTD', () => {
    const { getByText } = render(<PriceChangesTable data={sampleSecurity} />)

    expect(getByText('YTD')).toBeTruthy()
    expect(getByText('10.00%')).toBeTruthy()
  })

  it('does not render YTD when value is null', () => {
    const { queryByText } = render(
      <PriceChangesTable data={{ ...sampleSecurity, priceChangeYTD: null }} />
    )

    expect(queryByText('10.00%')).toBeFalsy()
  })

  it('renders correct value for 1 Year', () => {
    const { getByText } = render(<PriceChangesTable data={sampleSecurity} />)

    expect(getByText('1 Year')).toBeTruthy()
    expect(getByText('7.00%')).toBeTruthy()
  })

  it('does not render 1 Year when value is null', () => {
    const { queryByText } = render(
      <PriceChangesTable data={{ ...sampleSecurity, priceChange1Year: null }} />
    )

    expect(queryByText('7.00%')).toBeFalsy()
  })
})
