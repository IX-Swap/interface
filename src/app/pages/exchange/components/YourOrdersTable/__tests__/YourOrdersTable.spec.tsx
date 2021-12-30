import { YourOrdersTable } from 'app/pages/exchange/components/YourOrdersTable/YourOrderstable'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render } from 'test-utils'
import { user } from '__fixtures__/user'

describe('YourOrdersTable', () => {
  beforeEach(() => {
    const objResponse = {
      user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<YourOrdersTable />)
  })
})
