import { UserRouter } from 'app/pages/admin/router/UserRouter'
import React from 'react'
import { render } from 'test-utils'
import { AppRoute } from 'components/AppRoute'
import { AdminRoute } from 'app/pages/admin/router/config'
import { history } from 'config/history'

jest.mock('components/AppRoute', () => ({
  AppRoute: jest.fn(() => null)
}))

describe('UserRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<UserRouter />)
  })

  it('renders Approute with userId breadcrumb when userId is defined', () => {
    history.push({
      pathname: AdminRoute.view,
      state: { userId: '1234567890' }
    })
    render(<UserRouter />)
    expect(AppRoute).toHaveBeenCalledWith(
      expect.objectContaining({ breadcrumb: '1234567890' }),
      {}
    )
  })

  it('renders Approute with View User breadcrumb when userId is undefined', () => {
    history.push({
      pathname: AdminRoute.view,
      state: { userId: undefined }
    })
    render(<UserRouter />)
    expect(AppRoute).toHaveBeenCalledWith(
      expect.objectContaining({ breadcrumb: 'View User' }),
      {}
    )
  })
})
