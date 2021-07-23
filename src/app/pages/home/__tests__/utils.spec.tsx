import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import {
  getChartData,
  getTotalCapitalization,
  timeRange
} from 'app/pages/home/utils'
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

    expect(timeRange('1W')).toEqual({
      from: {
        day: dayLastWeek,
        month: monthLastWeek + 1,
        year: yearLastWeek
      },
      to: { day: dayToday, month: monthToday + 1, year: yearToday }
    })
  })
})
