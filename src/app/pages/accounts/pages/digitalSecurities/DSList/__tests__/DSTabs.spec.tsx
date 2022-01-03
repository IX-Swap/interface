import { DSTabs } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTabs'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DSTabs', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSTabs />)
  })
})
