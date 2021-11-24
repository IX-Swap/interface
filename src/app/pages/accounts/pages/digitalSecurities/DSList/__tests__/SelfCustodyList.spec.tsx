import React from 'react'
import { render, cleanup } from 'test-utils'
import { SelfCustodyList } from 'app/pages/accounts/pages/digitalSecurities/DSList/SelfCustodyList'
import * as useAuth from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

describe('SelfCustodyList', () => {
  beforeEach(() => {
    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => user as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SelfCustodyList />)
  })
})
