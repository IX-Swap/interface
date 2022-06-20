import { AuthorizerIdentityLink } from 'app/components/AuthorizerIdentityLink'
import {
  getIdentityDetails,
  OrderTableIdentityLink,
  renderParticipant
} from 'app/pages/authorizer/pages/otcTrades/OrderTableIdentityLink'
import React from 'react'
import { renderWithInitialWidth } from 'test-utils'
import { buyer, order1, order4 } from '__fixtures__/otcOrders'

jest.mock('app/components/AuthorizerIdentityLink', () => ({
  AuthorizerIdentityLink: jest.fn(() => null)
}))

describe('getIdentityDetails', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct identity details', () => {
    expect(getIdentityDetails('1234')).toEqual({
      userId: '1234',
      identityId: '',
      identityType: 'individual',
      name: ''
    })
    expect(getIdentityDetails('1234', { corporate: buyer })).toEqual({
      name: 'Test Company',
      userId: '1234',
      identityType: 'corporate',
      identityId: '623c3df86870580e1d878623'
    })
  })
})

describe('renderParticipant', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns correct identity details', () => {
    expect(renderParticipant(order1, 'BUY')).toEqual({
      userId: '609d1d93c54af74af46c027c',
      identityId: '6239cf13b14ef00e196a179b',
      identityType: 'individual',
      name: 'Fredericka Middle Erickson'
    })
    expect(renderParticipant(order4, 'SELL')).toEqual({
      userId: '1234',
      identityId: '46677',
      identityType: 'individual',
      name: 'A C B'
    })
  })
})

describe('OrderTableIdentityLink', () => {
  it('Renders AuthorizerIdentityLink with correct props', () => {
    renderWithInitialWidth(
      <OrderTableIdentityLink
        userId='56'
        identityId='456'
        identityType='individual'
        name='ewrw'
      />,
      'lg'
    )

    expect(AuthorizerIdentityLink).toHaveBeenCalledWith(
      expect.objectContaining({
        identityId: '456',
        type: 'individual',
        userId: '56',
        underline: 'none'
      }),
      {}
    )
  })
})
