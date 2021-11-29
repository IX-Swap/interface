import { Reports } from 'app/pages/educationCentre/components/AccessReports/Reports'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Reports', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Reports />)
  })
})
