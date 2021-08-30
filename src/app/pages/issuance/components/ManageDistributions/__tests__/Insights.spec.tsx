import { Insights } from 'app/pages/issuance/components/ManageDistributions/Insights'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Insights', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Insights />)
  })
})
