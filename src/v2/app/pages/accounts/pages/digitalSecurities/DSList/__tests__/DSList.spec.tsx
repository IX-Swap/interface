import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSList } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSList'

describe('DSList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSList />)
  })
})
