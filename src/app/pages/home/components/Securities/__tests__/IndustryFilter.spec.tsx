import { IndustryFilter } from 'app/pages/home/components/Securities/IndustryFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IndustryFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IndustryFilter />)
  })
})
