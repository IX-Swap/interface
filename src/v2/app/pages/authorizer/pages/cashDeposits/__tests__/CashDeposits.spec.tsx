/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CashDeposits,
  renderDeposit
} from 'v2/app/pages/authorizer/pages/cashDeposits/CashDeposits'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { cashDeposit } from '__fixtures__/authorizer'
import { DataroomFeature } from 'v2/types/authorizer'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'

jest.mock('v2/app/components/DepositView/DepositView', () => ({
  DepositView: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

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

      expect(depositView).toEqual(
        <AuthorizerView
          title='About This Deposit'
          data={cashDeposit}
          feature={DataroomFeature['cash-deposits']}
        >
          <DepositView data={cashDeposit} />
        </AuthorizerView>
      )
    })
  })
})
