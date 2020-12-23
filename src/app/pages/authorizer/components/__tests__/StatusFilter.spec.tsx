import React from 'react'
import { render } from 'test-utils'
import {
  StatusFilter,
  statusFilters
} from 'app/pages/authorizer/components/StatusFilter'

describe('StatusFilter', () => {
  it('renders items from list', async () => {
    const { getAllByRole } = render(<StatusFilter />)
    const items = getAllByRole('button')

    expect(items.length).toBe(statusFilters.length)
  })
})
