import { EducationCentreRoot } from 'app/pages/educationCentre/EducationCentreRoot'
import React from 'react'
import { render } from 'test-utils'

describe('EducationCentreRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<EducationCentreRoot />)
  })
})
