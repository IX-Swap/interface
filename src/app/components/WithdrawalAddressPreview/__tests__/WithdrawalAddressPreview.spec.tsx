import React from 'react'
import { render, cleanup } from 'test-utils'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import {
  WithdrawalAddressPreview,
  WithdrawalAddressViewProps
} from 'app/components/WithdrawalAddressPreview/WithdrawalAddressPreview'
import { LabelledValue } from 'components/LabelledValue'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('WithdrawalAddressPreview', () => {
  const props: WithdrawalAddressViewProps = { data: withdrawalAddress }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressPreview {...props} />)
  })

  it('renders LabelledValue with correct props', () => {
    render(<WithdrawalAddressPreview {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Network Type', value: withdrawalAddress.network.name },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Blockchain Address', value: withdrawalAddress.address },
      {}
    )
  })
})
