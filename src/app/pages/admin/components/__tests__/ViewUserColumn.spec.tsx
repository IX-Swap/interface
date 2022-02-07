import React from 'react'
import { ViewUserColumn } from 'app/pages/admin/components/ViewUserColumn'
import { render } from 'test-utils'
import IconButton from '@mui/material/IconButton'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'

jest.mock('@mui/material/IconButton', () => jest.fn(() => <button />))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => <span />)
}))

describe('ViewUserColumn', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders IconButton with correct props', () => {
    render(<ViewUserColumn userId='user-id' />)

    expect(IconButton).toHaveBeenCalledWith(
      expect.objectContaining({
        component: AppRouterLinkComponent,
        size: 'small',
        to: AdminRoute.view
      }),
      {}
    )
  })
})
