import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodySelect } from 'app/pages/authorizer/pages/TokenDeployment/CustodySelect'

describe('CustodySelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodySelect />)
  })
})
