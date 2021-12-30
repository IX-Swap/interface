import React from 'react'
import { render } from 'test-utils'

import { fakeVirtualAccount } from '__fixtures__/unassignedVirtualAccounts'
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
  const props: ActionsProps = {
    item: fakeVirtualAccount as VirtualAccount
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Actions {...props} />)
  })

  it('renders IconButton component with correct props', () => {
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
