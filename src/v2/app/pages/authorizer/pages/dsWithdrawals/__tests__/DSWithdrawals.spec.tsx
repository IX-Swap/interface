/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSWithdrawals,
  renderDSWithdrawal
} from 'v2/app/pages/authorizer/pages/dsWithdrawals/DSWithdrawals'
import DSWithdrawalView from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { dsWithdrawal } from '__fixtures__/authorizer'

jest.mock('v2/app/components/DSWithdrawalPreview', () => jest.fn(() => null))

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
        <DSWithdrawalView withdrawal={dsWithdrawal} />
      )
    })
  })
})
