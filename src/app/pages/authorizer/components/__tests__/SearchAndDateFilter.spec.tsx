import React from 'react'
import { render, cleanup } from 'test-utils'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'

describe('SearchAndDateFilter', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    render(<SearchAndDateFilter />)
  })
})
