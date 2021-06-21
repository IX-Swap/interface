import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerIssuanceDetailsRouter } from 'app/pages/authorizer/pages/issuanceDetails/router/AuthorizerIssuanceDetailsRouter'

describe('AuthorizerIssuanceDetailsRouter', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without errors', async () => {
    render(<AuthorizerIssuanceDetailsRouter />)
  })
})
