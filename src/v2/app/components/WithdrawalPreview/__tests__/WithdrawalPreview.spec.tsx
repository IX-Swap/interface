/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  WithdrawalPreview,
  WithdrawalViewProps
} from 'v2/app/components/WithdrawalPreview/WithdrawalPreview'
import { cashWithdrawal } from '__fixtures__/authorizer'

describe('WithdrawalPreview', () => {
  const props: WithdrawalViewProps = {
    data: cashWithdrawal
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalPreview {...props} />)
  })
})
