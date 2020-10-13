/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSTableActions } from 'v2/app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { balance } from '__fixtures__/balance'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { DSRoute } from 'v2/app/pages/accounts/pages/digitalSecurities/router'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('DSTableActions', () => {
  const props = { item: balance }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSTableActions {...props} />)
  })

  it('renders view, deposit & withdraw links', async () => {
    render(<DSTableActions {...props} />)

    expect(AppRouterLink).toHaveBeenNthCalledWith(
      1,
      {
        children: 'View',
        to: DSRoute.view,
        params: { balanceId: props.item.assetId }
      },
      {}
    )

    expect(AppRouterLink).toHaveBeenNthCalledWith(
      2,
      {
        children: 'Deposit',
        to: DSRoute.deposit,
        params: { balanceId: props.item.assetId }
      },
      {}
    )
    expect(AppRouterLink).toHaveBeenNthCalledWith(
      3,
      {
        children: 'Withdraw',
        to: DSRoute.withdraw,
        params: { balanceId: props.item.assetId }
      },
      {}
    )
  })
})
