import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceDetailsAuthorization } from 'app/pages/authorizer/pages/issuanceDetails/IssuanceDetailsAuthorization'

describe('IssuanceDetailsAuthorization', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without errors', async () => {
    render(<IssuanceDetailsAuthorization />)
  })
})
