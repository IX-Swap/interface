import React from 'react'
import { render } from 'test-utils'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import {
  WithdrawalAddressPreview,
  WithdrawalAddressViewProps
} from 'app/components/WithdrawalAddressPreview/WithdrawalAddressPreview'

describe('WithdrawalAddressPreview', () => {
  const props: WithdrawalAddressViewProps = { data: withdrawalAddress }

  it('renders without error', () => {
    const { container } = render(<WithdrawalAddressPreview {...props} />)
    expect(container).toMatchSnapshot()
  })
})
