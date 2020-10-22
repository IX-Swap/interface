import { getTimeAgo, convertDateToISO } from 'v2/helpers/dates'
import { formatISO } from 'date-fns'

describe('getTimeAgo', () => {
  it('returns "Just now" if current time is passed', () => {
    expect(getTimeAgo(new Date().toISOString())).toEqual('Just now')
  })
})
describe('convertDateToISO', () => {
  it('returns ISO string of given date', () => {
    expect(convertDateToISO(new Date())).toEqual(formatISO(new Date()))
  })

  it('returns undefined if date does not exist', () => {
    expect(convertDateToISO(undefined)).toEqual(undefined)
    expect(convertDateToISO(null)).toEqual(undefined)
  })

  it('returns undefined if date is empty string', () => {
    expect(convertDateToISO('')).toEqual(undefined)
  })
})
