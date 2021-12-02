import { CountryFilter } from 'app/pages/educationCentre/components/Securities/CountryFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CountryFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CountryFilter />)
  })
})
