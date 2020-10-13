/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSWithdrawals,
  renderDSWithdrawal
} from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'
import { DSWithdrawalPreview } from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { dsWithdrawal } from '__fixtures__/authorizer'
import { DataroomFeature } from '../../../../../../types/authorizer'
import { AuthorizerView } from '../../../components/AuthorizerView'

jest.mock('v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview', () => ({
  DSWithdrawalPreview: jest.fn(() => null)
}))

jest.mock('v2/app/pages/authorizer/components/AuthorizerView', () => ({
  AuthorizerView: jest.fn(() => null)
}))

describe('DSWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without throwing', async () => {
    render(<DSWithdrawals />)
  })

  describe('renderDSWithdrawal', () => {
    it('renders DSWithdrawalView component with correct data', () => {
      const dsWithdrawalView = renderDSWithdrawal(dsWithdrawal)

      expect(dsWithdrawalView).toEqual(
        <AuthorizerView
          title='About This Withdrawal'
          data={dsWithdrawal}
          feature={DataroomFeature['digital-security-withdrawals']}
        >
          <DSWithdrawalPreview data={dsWithdrawal} />
        </AuthorizerView>
      )
    })
  })
})
