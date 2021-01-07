import React from 'react'
import { render, cleanup } from 'test-utils'
import { DigitalSecurities } from 'app/pages/accounts/pages/digitalSecurities/DigitalSecurities'

describe('DigitalSecurities', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DigitalSecurities />)
  })
})
