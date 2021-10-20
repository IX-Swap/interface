import React from 'react'
import { render, cleanup } from 'test-utils'
import { TokenDeploymentRouter } from 'app/pages/authorizer/pages/TokenDeployment/TokenDeploymentRouter'

jest.mock(
  'app/pages/authorizer/pages/TokenDeployment/TokenDeployments',
  () => ({
    TokenDeployments: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/authorizer/pages/TokenDeployment/TokenDeploymentAuthorization',
  () => ({
    TokenDeploymentAuthorization: jest.fn(() => null)
  })
)

describe('TokenDeploymentRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TokenDeploymentRouter />)
  })
})
