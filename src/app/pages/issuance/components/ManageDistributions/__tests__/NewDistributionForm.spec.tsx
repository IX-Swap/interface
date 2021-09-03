import { NewDistributionForm } from 'app/pages/issuance/components/ManageDistributions/NewDistributionForm'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NewDistributionForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<NewDistributionForm />)
  })
})
