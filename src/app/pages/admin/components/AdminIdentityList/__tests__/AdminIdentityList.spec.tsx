import { AdminIdentityList } from 'app/pages/admin/components/AdminIdentityList/AdminIdentityList'
import React from 'react'
import { render } from 'test-utils'

describe('AdminIdentityList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AdminIdentityList />)
  })
})
