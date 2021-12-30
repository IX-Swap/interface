import { CreatedByAdminFilter } from 'app/pages/admin/components/AdminIdentityList/CreatedByAdminFilter/CreatedByAdminFilter'
import React from 'react'
import { render } from 'test-utils'

describe('CreateByAdminFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreatedByAdminFilter />)
  })
})
