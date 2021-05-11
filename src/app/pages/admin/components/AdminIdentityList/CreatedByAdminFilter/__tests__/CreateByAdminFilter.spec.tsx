import { CreatedByAdminFilter } from 'app/pages/admin/components/AdminIdentityList/CreatedByAdminFilter/CreatedByAdminFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CreateByAdminFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreatedByAdminFilter />)
  })
})
