import React from 'react'
import { render } from 'test-utils'
import { TokenDeployments } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeployments'

jest.mock('app/pages/authorizer/components/AuthorizerList', () => ({
  AuthorizerList: jest.fn(() => null)
}))

describe('TokenDeployments', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TokenDeployments />)
  })
})
