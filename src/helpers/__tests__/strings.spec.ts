import { OrderSide } from 'types/order'
import { getIdFromObj, getOrderSideName } from '../strings'

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

describe('getOrderSideName', () => {
  it('returns correct value when argument is BID', () => {
    expect(getOrderSideName(OrderSide.BID)).toEqual('Buy')
  })

  it('returns correct value when argument is ASK', () => {
    expect(getOrderSideName(OrderSide.ASK)).toEqual('Sell')
  })
})
