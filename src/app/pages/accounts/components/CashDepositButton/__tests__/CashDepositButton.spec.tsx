import { CashDepositButton } from 'app/pages/accounts/components/CashDepositButton/CashDepositButton'
import React from 'react'
import { render } from 'test-utils'

describe('CashDepositButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CashDepositButton />)
  })
})
