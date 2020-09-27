/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, renderWithUserStore } from 'test-utils'
import { Header } from 'v2/app/pages/accounts/pages/banks/BanksList/Header'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { appRoles } from 'v2/helpers/acl'
import { user } from '__fixtures__/user'
import * as useAuthHook from 'v2/hooks/auth/useAuth'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('Header', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Header />)
  })

  it('does not render deposit & withdraw buttons if user is not accredited', () => {
    render(<Header />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
  })

  it('renders deposit & withdraw buttons if user is accredited', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      user: { ...user, roles: appRoles.ACCREDITED },
      isAuthenticated: true
    })

    renderWithUserStore(<Header />)

    expect(AppRouterLink).toHaveBeenCalledTimes(3)
  })
})
