import { IdentityTypeFilter } from 'app/pages/admin/components/AdminIdentityList/IdentityTypeFilter/IdentityTypeFilter'
import React from 'react'
import { render } from 'test-utils'

describe('IdentityTypeFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IdentityTypeFilter />)
  })
})
