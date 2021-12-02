import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import {
  getChartData,
  getTotalCapitalization,
  timeRange
} from 'app/pages/educationCentre/utils'
import { sub } from 'date-fns'
import { cleanup } from 'test-utils'

const sampleSecurities = [sampleSecurity]

describe('getTotalCapitalization', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct value', () => {
    expect(getTotalCapitalization(sampleSecurities)).toBe(
      sampleSecurity.marketCapitalization
    )
  })

  it('returns correct value when security market capitalization is null', () => {
    const sampleNullSecurities = [
      { ...sampleSecurity, marketCapitalization: null }
    ]

    expect(getTotalCapitalization(sampleNullSecurities)).toBe(0)
  })

  it('returns correct value when security market capitalization is undefined', () => {
    const sampleNullSecurities = [
      { ...sampleSecurity, marketCapitalization: undefined }
    ]

    expect(getTotalCapitalization(sampleNullSecurities)).toBe(0)
  })
})

describe('getChartData', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct value for industry category', () => {
    expect(getChartData(sampleSecurities, 'Industry')).toEqual([
      ['Industry', 'value', { role: 'annotation' }],
      ['Diverse Industries', 0, '0.00%'],
      ['Real Estate', 100, '100.00%'],
      ['Technology', 0, '0.00%'],
      ['Finance', 0, '0.00%'],
      ['Energy & Mining', 0, '0.00%']
    ])
  })

  it('returns correct value for country category', () => {
    const sampleSecurities = [sampleSecurity]
    expect(getChartData(sampleSecurities, 'Country')).toEqual([
      ['Country', 'value', { role: 'annotation' }],
      ['United States', 100, '100.00%'],
      ['Germany', 0, '0.00%'],
      ['Liechtenstein', 0, '0.00%'],
      ['Bahamas', 0, '0.00%'],
      ['Seychelles', 0, '0.00%'],
      ['United Kingdom', 0, '0.00%']
    ])
  })

  it('returns correct value for country category', () => {
    const sampleSecurities = [sampleSecurity]
    expect(getChartData(sampleSecurities, 'Securities')).toEqual([
      ['Securities', 'value', { role: 'annotation' }],
      ['Equity', 100, '100.00%'],
      ['Debt', 0, '0.00%'],
      ['Investment Fund', 0, '0.00%'],
      ['Revenue Sharing', 0, '0.00%'],
      ['Convertible Security', 0, '0.00%']
    ])
  })

  it('returns correct value for protocol category', () => {
    expect(getChartData(sampleSecurities, 'Protocol')).toEqual([
      ['Protocol', 'value', { role: 'annotation' }],
      ['ERC-20', 100, '100.00%'],
      ['Algorand', 0, '0.00%'],
      ['ERC-1400', 0, '0.00%'],
      ['Tezos', 0, '0.00%'],
      ['INPR-18', 0, '0.00%'],
      ['DS', 0, '0.00%']
    ])
  })

  it('returns industries as cat and insdustry as prop when category is undefined', () => {
    expect(getChartData(sampleSecurities, undefined)).toEqual([
      ['Industry', 'value', { role: 'annotation' }],
      ['Diverse Industries', 0, '0.00%'],
      ['Real Estate', 100, '100.00%'],
      ['Technology', 0, '0.00%'],
      ['Finance', 0, '0.00%'],
      ['Energy & Mining', 0, '0.00%']
    ])
  })
})

describe('timeRange', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns correct value', () => {
    const today = new Date()
    const dayToday = today.getUTCDate()
    const monthToday = today.getUTCMonth()
    const yearToday = today.getUTCFullYear()

    const lastWeek = sub(today, { weeks: 1 })
    const dayLastWeek = lastWeek.getUTCDate()
    const monthLastWeek = lastWeek.getUTCMonth()
    const yearLastWeek = lastWeek.getUTCFullYear()

    const lastMonth = sub(today, { months: 1 })
    const dayLastMonth = lastMonth.getUTCDate()
    const monthLastMonth = lastMonth.getUTCMonth()
    const yearLastMonth = lastMonth.getUTCFullYear()

    const halfYearAgo = sub(today, { months: 6 })
    const dayHalfYearAgo = halfYearAgo.getUTCDate()
    const monthHalfYearAgo = halfYearAgo.getUTCMonth()
    const yearHalfYearAgo = halfYearAgo.getUTCFullYear()

    const aYearAgo = sub(today, { years: 1 })
    const dayAYearAgo = aYearAgo.getUTCDate()
    const monthAYearAgo = aYearAgo.getUTCMonth()
    const yearAYearAgo = aYearAgo.getUTCFullYear()

    expect(timeRange('1W')).toEqual({
      from: {
        day: dayLastWeek,
        month: monthLastWeek + 1,
        year: yearLastWeek
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })

    expect(timeRange('1M')).toEqual({
      from: {
        day: dayLastMonth,
        month: monthLastMonth + 1,
        year: yearLastMonth
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })

    expect(timeRange('6M')).toEqual({
      from: {
        day: dayHalfYearAgo,
        month: monthHalfYearAgo + 1,
        year: yearHalfYearAgo
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })

    expect(timeRange('1Y')).toEqual({
      from: {
        day: dayAYearAgo,
        month: monthAYearAgo + 1,
        year: yearAYearAgo
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })

    expect(timeRange('MAX')).toEqual({
      from: {
        day: 1,
        month: 1,
        year: 1
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })

    expect(timeRange('NO' as any)).toEqual({
      from: {
        day: 1,
        month: 1,
        year: 1
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })
  })
})
