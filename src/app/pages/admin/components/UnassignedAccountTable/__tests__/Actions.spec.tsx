import React from 'react'
import { render, cleanup } from 'test-utils'

import { fakeVirtualAccounts } from '__fixtures__/unassignedVirtualAccounts'
import {
  Actions,
  ActionsProps
} from 'app/pages/admin/components/UnassignedAccountTable/Actions'
import { VirtualAccount } from 'types/virtualAccount'
import * as IconButton from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'

jest.mock('@material-ui/core/IconButton', () => jest.fn(() => null))

describe('Actions', () => {
  const props: ActionsProps = { item: fakeVirtualAccounts[0] as VirtualAccount }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders with IconButton component with correct props', () => {
    render(<Actions {...props} />)
    expect(IconButton).toBeCalledWith(
      expect.objectContaining({
        component: AppRouterLinkComponent,
        params: { VirtualAccountId: props.item._id },
        size: 'small',
        to: AdminRoute.landing,
        disabled: true
      }),
      {}
    )
  })
})
