import { CashDepositDetails } from 'app/pages/accounts/components/VirtualAccountCashDeposit/CashDepositDetails'
import React from 'react'
import { render } from 'test-utils'

describe('CashDepositDetails', () => {
  const sampleData = [{ label: 'Currency', value: 'SGD' }]

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CashDepositDetails data={sampleData} />)
  })
})
