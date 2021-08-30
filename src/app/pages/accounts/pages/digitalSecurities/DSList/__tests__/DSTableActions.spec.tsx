import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSTableActions } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { balance } from '__fixtures__/balance'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
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

    expect(AppRouterLinkComponent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: expect.anything(),
        to: DSRoute.deposit,
        params: { balanceId: props.item.assetId }
      }),
      {}
    )
    expect(AppRouterLinkComponent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: expect.anything(),
        to: DSRoute.withdraw,
        params: { balanceId: props.item.assetId }
      }),
      {}
    )
  })
})
