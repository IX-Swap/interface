import { Filters } from 'app/pages/admin/components/AdminIdentityList/Filters'
import React from 'react'
import { render } from 'test-utils'

describe('Filters', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Filters />)
  })
})
