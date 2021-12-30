import React from 'react'
import { render } from 'test-utils'
import { DigitalSecurities } from 'app/pages/accounts/pages/digitalSecurities/DigitalSecurities'

describe('DigitalSecurities', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DigitalSecurities />)
  })
})
