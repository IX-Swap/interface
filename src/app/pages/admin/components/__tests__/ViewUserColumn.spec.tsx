import React from 'react'
import { ViewUserColumn } from 'app/pages/admin/components/ViewUserColumn'
import { render, cleanup } from 'test-utils'
import IconButton from '@material-ui/core/IconButton'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

jest.mock('@material-ui/core/IconButton', () => jest.fn(() => <button />))

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => <span />)
}))

describe('ViewUserColumn', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewUserColumn userId='user-id' />)
  })

  it('renders IconButton with correct props', () => {
    render(<ViewUserColumn userId='user-id' />)

    expect(IconButton).toHaveBeenCalledWith(
      expect.objectContaining({
        component: AppRouterLinkComponent,
        size: 'small',
        to: 'path/to/user/'
      }),
      {}
    )
  })
})
