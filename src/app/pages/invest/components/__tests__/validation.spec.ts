import { validateOTCOrder } from 'app/pages/invest/validation'
import {
  invalidFloatingPointAmount,
  invalidOTCOrderData,
  validOTCOrderData
} from '__fixtures__/otcOrders'

describe('validateOTCOrder', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('shows otc order to be valid for valid data', () => {
    expect(validateOTCOrder(validOTCOrderData)).toEqual('')
  })
  it('shows validation message for invalid data', () => {
    expect(validateOTCOrder(invalidOTCOrderData)).toEqual(
      'Amount and price must be greater than 0'
    )
    expect(validateOTCOrder(invalidFloatingPointAmount)).toEqual(
      'Floating point amounts are not allowed'
    )
  })
})
