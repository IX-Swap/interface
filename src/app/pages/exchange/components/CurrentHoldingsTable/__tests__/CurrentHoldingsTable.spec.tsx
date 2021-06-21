import { CurrentHoldingsTable } from 'app/pages/exchange/components/CurrentHoldingsTable/CurrentHoldingsTable'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { user } from '__fixtures__/user'

describe('CurrentHoldingsTable', () => {
  beforeEach(() => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CurrentHoldingsTable />)
  })
})
