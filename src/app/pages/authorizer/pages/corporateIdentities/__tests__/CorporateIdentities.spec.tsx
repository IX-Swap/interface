import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateIdentities } from 'app/pages/authorizer/pages/corporateIdentities/CorporateIdentities'

describe('CorporateIdentities', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CorporateIdentities />)
  })
})
