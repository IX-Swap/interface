import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdentities } from 'v2/app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'

describe('CorporateIdentities', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CorporateIdentities />)
  })
})
