import React from 'react'
import { render } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesTable/Actions'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

describe('Actions', () => {
  const props: ActionsProps = { item: withdrawalAddress }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Actions {...props} />)
  })
})
