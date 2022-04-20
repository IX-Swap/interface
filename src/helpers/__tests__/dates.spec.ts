import {
  getTimeAgo,
  convertDateToISO,
  formatDateToMMDDYY,
  formatDateAndTime
} from 'helpers/dates'
import subDays from 'date-fns/subDays'
import subHours from 'date-fns/subHours'
import subMinutes from 'date-fns/subMinutes'

describe('getTimeAgo', () => {
  it('returns "Now" if current time is passed', () => {
    expect(getTimeAgo(new Date().toISOString())).toEqual('Now')
  })

  it('returns "x m" if input time is few mins ago from current time', () => {
    expect(getTimeAgo(subMinutes(new Date(), 2).toISOString())).toEqual('2 m')
  })

  it('returns "x h" if input time is few hours ago from current time', () => {
    expect(getTimeAgo(subHours(new Date(), 3).toISOString())).toEqual('3 h')
  })

  it('returns "x d" if input time is few days ago from current time', () => {
    expect(getTimeAgo(subDays(new Date(), 3).toISOString())).toEqual('3 d')
  })
})

describe('formatDateToMMDDYY', () => {
  it('returns formatted date string', () => {
    const d = new Date()
    d.setFullYear(2020)
    d.setMonth(2)
    d.setDate(20)
    expect(formatDateToMMDDYY(d.toISOString())).toEqual('03/20/2020')
  })
})

describe('formatDateAndTime', () => {
  const d = new Date()
  d.setFullYear(2020)
  d.setMonth(2)
  d.setDate(20)
  d.setHours(1)
  d.setMinutes(2)

  it('returns formatted date & time string', () => {
    expect(formatDateAndTime(d.toISOString())).toEqual('Mar 20, 2020 01:02 AM')
  })

  it('returns empty string if empty string', () => {
    expect(formatDateAndTime('')).toEqual('')
  })
})

describe('convertDateToISO', () => {
  const current = new Date()

  it('returns ISO string of given date', () => {
    expect(convertDateToISO(current)).toEqual(current.toISOString())
  })

  it('returns correct formatted date string', () => {
    expect(convertDateToISO(current.getTime().toString())).toEqual(
      current.toISOString()
    )
  })

  it('returns undefined if date does not exist', () => {
    expect(convertDateToISO(undefined)).toEqual(undefined)
    expect(convertDateToISO(null)).toEqual(undefined)
  })

  it('returns undefined if date is empty string', () => {
    expect(convertDateToISO('')).toEqual(undefined)
  })
})
