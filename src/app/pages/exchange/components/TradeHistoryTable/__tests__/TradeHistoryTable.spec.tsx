import { TradeHistoryTable } from 'app/pages/exchange/components/TradeHistoryTable/TradeHistoryTable'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render } from 'test-utils'
import { user } from '__fixtures__/user'

describe('TradeHistoryTable', () => {
  beforeEach(() => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TradeHistoryTable />)
  })
})
