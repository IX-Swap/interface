import { DSTooltip } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTooltip'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DSTooltip', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DSTooltip />)
  })
})
