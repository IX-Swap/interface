import { Reports } from 'app/pages/educationCentre/pages/Reports'
import React from 'react'
import { render } from 'test-utils'
import { Reports as ReportComponent } from 'app/pages/educationCentre/components/AccessReports/Reports'

jest.mock('app/pages/educationCentre/components/AccessReports/Reports', () => ({
  Reports: jest.fn(() => null)
}))

describe('Reports', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components correctly', () => {
    render(<Reports />)

    expect(ReportComponent).toHaveBeenCalled()
  })
})
