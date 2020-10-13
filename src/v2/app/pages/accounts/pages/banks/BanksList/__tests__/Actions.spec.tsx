/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'v2/app/pages/accounts/pages/banks/BanksList/Actions'
import { bank } from '__fixtures__/authorizer'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { BanksRoute } from 'v2/app/pages/accounts/pages/banks/router'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
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

  it('renders edit & view links', async () => {
    render(<Actions {...props} />)

    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Edit',
        to: BanksRoute.edit,
        params: { bankId: props.item._id }
      },
      {}
    )

    expect(AppRouterLink).toHaveBeenNthCalledWith(
      2,
      {
        children: 'View',
        to: BanksRoute.view,
        params: { bankId: props.item._id }
      },
      {}
    )
  })
})
