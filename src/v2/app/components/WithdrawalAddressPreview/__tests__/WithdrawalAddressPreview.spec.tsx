import React from 'react'
import { render, cleanup } from 'test-utils'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import {
  WithdrawalAddressPreview,
  WithdrawalAddressViewProps
} from 'v2/app/components/WithdrawalAddressPreview/WithdrawalAddressPreview'

describe('WithdrawalAddressPreview', () => {
  const props: WithdrawalAddressViewProps = { data: withdrawalAddress }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressPreview {...props} />)
  })
})
