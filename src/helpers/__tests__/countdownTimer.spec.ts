import { UnitMap } from 'app/pages/issuance/hooks/useCountdown'
import {
  getEndDate,
  getTimeUnitsToDisplay,
  getInterval
} from 'helpers/countdownTimer'
import { dso } from '__fixtures__/authorizer'

describe('getEndDate', () => {
  const sampleDSO = dso

  it('returns completion date when launch date has past', () => {
    const endDate = getEndDate(sampleDSO)
    expect(endDate).toBe('12-12-2220')
  })

  it('returns launch date when launch date has not yet past', () => {
    sampleDSO.launchDate = '12-12-3000'
    const endDate = getEndDate(sampleDSO)
    expect(endDate).toBe('12-12-3000')
  })
})

describe('getTimeUnitsToDisplay', () => {
  const sampleUnits: UnitMap = {
    years: 1,
    months: 1,
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1
  }

  it('returns correct time unit array when years is more than 1', () => {
    const timeUnits = getTimeUnitsToDisplay(sampleUnits)
    expect(timeUnits).toMatchObject(['years', 'months', 'days'])
  })

  it('returns correct time unit array when years is less than 1 and months is more than 1', () => {
    sampleUnits.years = 0
    const timeUnits = getTimeUnitsToDisplay(sampleUnits)
    expect(timeUnits).toMatchObject(['months', 'days', 'hours'])
  })

  it('returns correct time unit array when years and months is less than 1 and days is more than 1', () => {
    sampleUnits.years = 0
    sampleUnits.months = 0
    const timeUnits = getTimeUnitsToDisplay(sampleUnits)
    expect(timeUnits).toMatchObject(['days', 'hours', 'minutes'])
  })

  it('returns correct time unit array when years, months and days is less than 1', () => {
    sampleUnits.years = 0
    sampleUnits.months = 0
    sampleUnits.days = 0
    const timeUnits = getTimeUnitsToDisplay(sampleUnits)
    expect(timeUnits).toMatchObject(['hours', 'minutes', 'seconds'])
  })
})

describe('getInterval', () => {
  let sampleDiff = 1000 * 60 * 60 * 24 * 30
  it('returns correct interval when diff is more than 24 hours', () => {
    const interval = getInterval(sampleDiff)
    expect(interval).toBe(1000 * 60)
  })

  it('returns correct interval when diff is less than 24 hours', () => {
    sampleDiff = 100 * 60 * 60 * 23
    const interval = getInterval(sampleDiff)
    expect(interval).toBe(1000)
  })
})
