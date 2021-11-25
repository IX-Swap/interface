import { ReportLogo } from 'app/pages/home/components/AccessReports/ReportLogo'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ReportLogo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ReportLogo isAtlasOne={true} />)
  })
})
