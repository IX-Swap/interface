import React from 'react'
import { render } from 'test-utils'
import { DSList } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSList'

describe('DSList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DSList />)
  })
})
