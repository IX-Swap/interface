import { DSTabs } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTabs'
import React from 'react'
import { render } from 'test-utils'

describe('DSTabs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DSTabs />)
  })
})
