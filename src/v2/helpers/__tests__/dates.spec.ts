import {
  getTimeAgo,
  convertDateToISO,
  formatDateToMMDDYY
} from 'v2/helpers/dates'
import { formatISO } from 'date-fns'

describe('getTimeAgo', () => {
  it('returns "Just now" if current time is passed', () => {
    expect(getTimeAgo(new Date().toISOString())).toEqual('Just now')
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

describe('convertDateToISO', () => {
  it('returns ISO string of given date', () => {
    expect(convertDateToISO(new Date())).toEqual(formatISO(new Date()))
  })

  it('returns correct formatted date string', () => {
    const d = new Date()
    expect(convertDateToISO(d.getTime().toString())).toEqual(formatISO(d))
  })

  it('returns undefined if date does not exist', () => {
    expect(convertDateToISO(undefined)).toEqual(undefined)
    expect(convertDateToISO(null)).toEqual(undefined)
  })

  it('returns undefined if date is empty string', () => {
    expect(convertDateToISO('')).toEqual(undefined)
  })
})
