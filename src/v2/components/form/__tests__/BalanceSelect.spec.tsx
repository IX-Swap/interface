import React from 'react'
import { render, cleanup } from 'test-utils'
import { BalanceSelect } from 'v2/components/form/BalanceSelect'

describe('BalanceSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BalanceSelect />)
  })
})
