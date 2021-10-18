import { AtlasOneReports } from 'app/pages/home/components/AtlasOneReports/AtlasOneReports'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AtlasOneReports', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AtlasOneReports />)
  })
})
