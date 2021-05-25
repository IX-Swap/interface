import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import { bank } from '__fixtures__/authorizer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'

jest.mock('__tests__/AppRouterLink', () => ({
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

  it('renders edit & view links', async () => {
    render(<Actions {...props} />)

    expect(AppRouterLinkComponent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: expect.anything(),
        to: BanksRoute.edit,
        params: { bankId: props.item._id }
      }),
      {}
    )

    expect(AppRouterLinkComponent).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: expect.anything(),
        to: BanksRoute.view,
        params: { bankId: props.item._id }
      }),
      {}
    )
  })
})
