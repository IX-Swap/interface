import { EducationCentreRoot } from 'app/pages/educationCentre/EducationCentreRoot'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('EducationCentreRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<EducationCentreRoot />)
  })
})
