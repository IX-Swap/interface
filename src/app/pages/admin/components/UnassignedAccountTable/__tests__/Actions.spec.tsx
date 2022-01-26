import React from 'react'
import { render } from 'test-utils'
import { fakeVirtualAccount } from '__fixtures__/unassignedVirtualAccounts'
import {
  Actions,
  ActionsProps
} from 'app/pages/admin/components/UnassignedAccountTable/Actions'
// import * as IconButton from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'

jest.mock('@material-ui/core/IconButton', () => jest.fn(() => null))

describe('Actions', () => {
  const props: ActionsProps = {
    item: fakeVirtualAccount
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  // it('renders IconButton component with correct props', () => {
  //   render(<Actions {...props} />)
  //   expect(IconButton).toBeCalledWith(
  //     expect.objectContaining({
  //       component: AppRouterLinkComponent,
  //       params: { VirtualAccountId: props.item._id },
  //       size: 'small',
  //       to: AdminRoute.landing,
  //       disabled: true
  //     }),
  //     {}
  //   )
  // })
})
