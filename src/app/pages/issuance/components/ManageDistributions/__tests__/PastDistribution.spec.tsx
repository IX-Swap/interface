import { PastDistributionsTable } from 'app/pages/issuance/components/ManageDistributions/PastDistributionsTable'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('PastDistributionTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PastDistributionsTable />)
  })
})
