import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { bank } from '__fixtures__/authorizer'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('Actions', () => {
  const props: ActionsProps = {
    item: bank
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', async () => {
    render(<Actions {...props} />)
  })
})
