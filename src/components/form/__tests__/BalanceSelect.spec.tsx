import React from 'react'
import { render } from 'test-utils'
import { BalanceSelect } from 'components/form/BalanceSelect'

describe('BalanceSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BalanceSelect />)
  })
})
