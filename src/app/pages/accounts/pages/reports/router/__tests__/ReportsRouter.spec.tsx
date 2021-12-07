import React from 'react'
import { render, cleanup } from 'test-utils'
import { ReportsRouter } from 'app/pages/accounts/pages/reports/router/ReportsRouter'

describe('ReportsRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ReportsRouter />)
  })
})
