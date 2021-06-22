import { IdentityTypeFilter } from 'app/pages/admin/components/AdminIdentityList/IdentityTypeFilter/IdentityTypeFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IdentityTypeFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IdentityTypeFilter />)
  })
})
