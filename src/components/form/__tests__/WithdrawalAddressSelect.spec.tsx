import React from 'react'
import { cleanup, render } from 'test-utils'
import { WithdrawalAddressSelect } from 'components/form/WithdrawalAddressSelect'
import { QueryStatus } from 'react-query'
import { LOADING_TEXT } from '../renderUtils'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

describe('WithdrawalAddressSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders loading if status is loading', () => {
    const { container } = render(
      <WithdrawalAddressSelect
        status={QueryStatus.Loading}
        list={[withdrawalAddress]}
      />
    )

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
