import { ReportLogo } from 'app/pages/educationCentre/components/AccessReports/ReportLogo'
import React from 'react'
import { render } from 'test-utils'

describe('ReportLogo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ReportLogo isAtlasOne={true} />)
  })
})
