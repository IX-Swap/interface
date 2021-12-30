import { Reports } from 'app/pages/educationCentre/components/AccessReports/Reports'
import React from 'react'
import { render } from 'test-utils'

describe('Reports', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Reports />)
  })
})
