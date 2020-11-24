import React from 'react'
import { render, cleanup } from 'test-utils'
import { IndividualIdentities } from 'v2/app/pages/authorizer/pages/individualIdentities/IndividualIdentities'

describe('IndividualIdentities', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<IndividualIdentities />)
  })
})
