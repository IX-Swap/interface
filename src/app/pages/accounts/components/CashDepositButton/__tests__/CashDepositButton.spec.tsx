import { CashDepositButton } from 'app/pages/accounts/components/CashDepositButton/CashDepositButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CashDepositButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CashDepositButton />)
  })
})
