import { YourOrdersTable } from 'app/pages/exchange/market/components/YourOrdersTable/YourOrderstable'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { user } from '__fixtures__/user'

describe('YourOrdersTable', () => {
  beforeEach(() => {
    const objResponse = {
      user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<YourOrdersTable />)
  })
})
