import { AvailableBalance } from 'app/pages/issuance/components/ManageDistributions/AvailableBalance'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AvailableBalance', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AvailableBalance />)
  })
})
