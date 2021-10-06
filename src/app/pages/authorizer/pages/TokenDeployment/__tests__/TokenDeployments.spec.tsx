import React from 'react'
import { render, cleanup } from 'test-utils'
import { TokenDeployments } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeployments'

jest.mock('app/pages/authorizer/components/AuthorizerList', () => ({
  AuthorizerList: jest.fn(() => null)
}))

describe('TokenDeployments', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TokenDeployments />)
  })
})
