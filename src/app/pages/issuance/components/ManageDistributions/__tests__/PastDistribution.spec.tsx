import { PastDistributionsTable } from 'app/pages/issuance/components/ManageDistributions/PastDistributionsTable'
import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('PastDistributionTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<PastDistributionsTable dso={dso} />)
  })
})
