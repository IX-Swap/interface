import { Insights } from 'app/pages/issuance/components/ManageDistributions/Insights'
import React from 'react'
import { render } from 'test-utils'

describe('Insights', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Insights />)
  })
})
