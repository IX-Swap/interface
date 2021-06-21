import { AdminIdentityList } from 'app/pages/admin/components/AdminIdentityList/AdminIdentityList'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AdminIdentityList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AdminIdentityList />)
  })
})
