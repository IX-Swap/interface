import { NewDistributionForm } from 'app/pages/issuance/components/ManageDistributions/NewDistributionForm'
import React from 'react'
import { render } from 'test-utils'

describe('NewDistributionForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NewDistributionForm />)
  })
})
