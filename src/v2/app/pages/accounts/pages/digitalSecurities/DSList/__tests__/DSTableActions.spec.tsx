/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSTableActions } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { balance } from '__fixtures__/balance'
import { AppRouterLink } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('DSTableActions', () => {
  const props = { item: balance }
  const DSRouter = {
    list: '/app/accounts/digital-securities',
    view: '/app/accounts/digital-securities/:balanceId/view',
    deposit: '/app/accounts/digital-securities/:balanceId/deposit',
    withdraw: '/app/accounts/digital-securities/:balanceId/withdraw'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSTableActions {...props} />)
  })

  it('renders view, deposit & withdraw links', async () => {
    render(<DSTableActions {...props} />)

    expect(AppRouterLink).toHaveBeenCalledTimes(3)
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        children: 'View',
        to: DSRouter.view,
        params: { balanceId: props.item._id }
      },
      {}
    )

    expect(AppRouterLink).toHaveBeenNthCalledWith(
      2,
      {
        children: 'Deposit',
        to: DSRouter.deposit,
        params: { balanceId: props.item._id }
      },
      {}
    )
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      3,
      {
        children: 'Withdraw',
        to: DSRouter.withdraw,
        params: { balanceId: props.item._id }
      },
      {}
    )
  })
})
