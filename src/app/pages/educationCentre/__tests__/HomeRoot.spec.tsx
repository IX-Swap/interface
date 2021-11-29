import { HomeRoot } from 'app/pages/educationCentre/EducationCentreRoot'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('HomeRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<HomeRoot />)
  })
})
