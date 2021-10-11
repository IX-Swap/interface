import React from 'react'
import { render } from 'test-utils'
import {
  StatusFilter,
  statusFilters,
  fundStatusFilters
} from 'app/pages/authorizer/components/StatusFilter'
import * as useAuthorizerCategory from 'hooks/location/useAuthorizerCategory'

describe('StatusFilter', () => {
  it('renders items from list', async () => {
    const { getAllByRole } = render(<StatusFilter />)
    const items = getAllByRole('button')

    expect(items.length).toBe(statusFilters.length + 1)
  })

  it('renders correct filter when category is commitments', () => {
    const objResponse = 'commitments'

    jest
      .spyOn(useAuthorizerCategory, 'useAuthorizerCategory')
      .mockImplementation(() => objResponse as any)

    const { getAllByRole } = render(<StatusFilter />)
    const items = getAllByRole('button')

    expect(items.length).toBe(fundStatusFilters.length)
  })
})
