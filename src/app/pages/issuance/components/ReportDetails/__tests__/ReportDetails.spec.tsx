import { ReportDetails } from 'app/pages/issuance/components/ReportDetails/ReportDetails'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ReportDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ReportDetails />)
  })
})
