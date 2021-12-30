import React from 'react'
import { render } from 'test-utils'
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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TokenDeploymentRouter />)
  })
})
