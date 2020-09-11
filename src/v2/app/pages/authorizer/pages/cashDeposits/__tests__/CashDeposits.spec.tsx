/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CashDeposits,
  renderDeposit
} from 'v2/app/pages/authorizer/pages/cashDeposits/CashDeposits'
import DepositView from 'v2/app/components/deposit-preview'
import { cashDeposit } from '__fixtures__/authorizer'

jest.mock('v2/app/components/deposit-preview', () => jest.fn(() => null))

describe('CashDeposits', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<CashDeposits />)
  })

  describe('renderDeposit', () => {
    it('renders DepositView component with correct data', () => {
      const depositView = renderDeposit(cashDeposit)
      expect(depositView).toEqual(<DepositView deposit={cashDeposit} />)
    })
  })
})
