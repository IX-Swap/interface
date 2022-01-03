import { Reports } from 'app/pages/educationCentre/pages/Reports'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Reports as ReportComponent } from 'app/pages/educationCentre/components/AccessReports/Reports'

jest.mock('app/pages/educationCentre/components/AccessReports/Reports', () => ({
  Reports: jest.fn(() => null)
}))

describe('Reports', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Reports />)
  })

  it('renders components correctly', () => {
    render(<Reports />)

    expect(ReportComponent).toHaveBeenCalled()
  })
})
