import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/Actions'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

describe('Actions', () => {
  const props: ActionsProps = { item: withdrawalAddress }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Actions {...props} />)
  })
})
