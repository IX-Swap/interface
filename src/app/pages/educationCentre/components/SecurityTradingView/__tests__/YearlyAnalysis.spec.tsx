import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import { YearlyAnalysis } from 'app/pages/educationCentre/components/SecurityTradingView/YearlyAnalysis'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { formatMoney } from 'helpers/numbers'

jest.mock('helpers/numbers', () => ({
  formatMoney: jest.fn(
    (amount: number, symbol: string) => `${symbol} ${amount.toFixed(2)}`
  )
}))

describe('YearlyAnalysis', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<YearlyAnalysis data={sampleSecurity} />)
  })

  it('renders oneYearLowPrice data with correct value', () => {
    const { getByText } = render(<YearlyAnalysis data={sampleSecurity} />)

    expect(getByText('$ 4.00')).toBeTruthy()
    expect(formatMoney).toHaveBeenCalledWith(4, '$')
  })

  it('renders oneYearLowPrice data with - when it is undefined', () => {
    const { getByText } = render(
      <YearlyAnalysis data={{ ...sampleSecurity, oneYearLowPrice: null }} />
    )

    expect(getByText('-')).toBeTruthy()
  })

  it('renders oneYearHighPrice data with correct value', () => {
    const { getByText } = render(<YearlyAnalysis data={sampleSecurity} />)

    expect(getByText('$ 3.00')).toBeTruthy()
    expect(formatMoney).toHaveBeenCalledWith(3, '$')
  })

  it('renders oneYearHighPrice data with - when it is undefined', () => {
    const { getByText } = render(
      <YearlyAnalysis data={{ ...sampleSecurity, oneYearHighPrice: null }} />
    )

    expect(getByText('-')).toBeTruthy()
  })

  it('renders oneYearMedianPrice data with correct value', () => {
    const { getByText } = render(<YearlyAnalysis data={sampleSecurity} />)

    expect(getByText('$ 5.00')).toBeTruthy()
    expect(formatMoney).toHaveBeenCalledWith(5, '$')
  })

  it('renders oneYearMedianPrice data with - when it is undefined', () => {
    const { getByText } = render(
      <YearlyAnalysis data={{ ...sampleSecurity, oneYearMedianPrice: null }} />
    )

    expect(getByText('-')).toBeTruthy()
  })

  it('renders oneYearAveragePrice data with correct value', () => {
    const { getByText } = render(<YearlyAnalysis data={sampleSecurity} />)

    expect(getByText('$ 2.00')).toBeTruthy()
    expect(formatMoney).toHaveBeenCalledWith(2, '$')
  })

  it('renders oneYearAveragePrice data with - when it is undefined', () => {
    const { getByText } = render(
      <YearlyAnalysis data={{ ...sampleSecurity, oneYearAveragePrice: null }} />
    )

    expect(getByText('-')).toBeTruthy()
  })

  it('renders oneYearAverageDailyVolume data with correct value', () => {
    const { getByText } = render(<YearlyAnalysis data={sampleSecurity} />)

    expect(getByText('$ 1.00')).toBeTruthy()
    expect(formatMoney).toHaveBeenCalledWith(1, '$')
  })

  it('renders oneYearAverageDailyVolume data with - when it is undefined', () => {
    const { getByText } = render(
      <YearlyAnalysis
        data={{ ...sampleSecurity, oneYearAverageDailyVolume: null }}
      />
    )

    expect(getByText('-')).toBeTruthy()
  })
})
