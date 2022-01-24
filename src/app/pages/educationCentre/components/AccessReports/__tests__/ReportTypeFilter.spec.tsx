import { ReportTypeFilter } from 'app/pages/educationCentre/components/AccessReports/ReportTypeFilter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ReportTypeFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ReportTypeFilter />)
  })
})
