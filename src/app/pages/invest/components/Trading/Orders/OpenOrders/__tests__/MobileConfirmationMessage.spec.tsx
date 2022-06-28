import Grid from '@mui/material/Grid'
import { MobileConfirmationMessage } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage'
import * as getExpiresOrderMessage from 'helpers/dates'
import React from 'react'
import { render } from 'test-utils'
import { order1Open } from '__fixtures__/otcOrders'

jest.mock('@mui/material/Grid', () =>
  jest.fn(({ children }) => <>{children}</>)
)

describe('MobileConfirmationMessage', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty state correctly for account state', () => {
    jest
      .spyOn(getExpiresOrderMessage, 'getExpiresOrderMessage')
      .mockImplementation(() => 'Test message')
    render(<MobileConfirmationMessage item={order1Open} color={'initial'} />)
    expect(Grid).toHaveBeenCalledTimes(1)
  })
})
