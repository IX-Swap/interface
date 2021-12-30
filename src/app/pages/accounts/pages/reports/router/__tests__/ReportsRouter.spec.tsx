import React from 'react'
import { render } from 'test-utils'
import { ReportsRouter } from 'app/pages/accounts/pages/reports/router/ReportsRouter'

describe('ReportsRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ReportsRouter />)
  })
})
