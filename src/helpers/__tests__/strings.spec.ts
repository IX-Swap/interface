import { getIdFromObj } from '../strings'

describe('getIDString', () => {
  it('returns _id property of input value', () => {
    expect(getIdFromObj({ _id: '123' })).toEqual('123')
  })

  it('returns empty string if input value does not contain _id', () => {
    expect(getIdFromObj({ uid: '123' })).toEqual('')
  })

  it('returns empty string if input value is null', () => {
    expect(getIdFromObj(null)).toEqual('')
  })

  it('returns empty string if input value is undefined', () => {
    expect(getIdFromObj(undefined)).toEqual('')
  })
})
