import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CashDepositDetails', () => {
  const sampleData = [{ label: 'Currency', value: 'SGD' }]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CashDepositDetails data={sampleData} />)
  })
})
