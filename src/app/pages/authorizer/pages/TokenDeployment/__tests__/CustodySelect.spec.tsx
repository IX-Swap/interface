import React from 'react'
import { render } from 'test-utils'
import { CustodySelect } from 'app/pages/authorizer/pages/TokenDeployment/CustodySelect'

describe('CustodySelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CustodySelect />)
  })
})
