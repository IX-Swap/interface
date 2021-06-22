import { Filters } from 'app/pages/admin/components/AdminIdentityList/Filters'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Filters', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Filters />)
  })
})
