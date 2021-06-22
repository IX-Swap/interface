import React from 'react'
import { render, cleanup } from 'test-utils'
import { IssuanceDetails } from 'app/pages/authorizer/pages/issuanceDetails/IssuanceDetails'

describe('IssuanceDetails', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<IssuanceDetails />)
  })
})
