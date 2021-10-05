import { CategoryFilter } from 'app/pages/home/components/Securities/CategoryFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CategoryFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CategoryFilter />)
  })
})
