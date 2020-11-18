import React from 'react'
import { render, cleanup } from 'test-utils'
import { Sidebar } from 'v2/app/components/Sidebar/Sidebar'
import { SidebarLink } from 'v2/app/components/Sidebar/components/SidebarLink'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import * as acl from 'v2/helpers/acl'
import * as useAuthorizerRouterHook from 'v2/app/pages/authorizer/router'
import * as useAccountsRouterHook from 'v2/app/pages/accounts/router'
import * as useInvestRouterHook from 'v2/app/pages/invest/routers/router'
import * as useIssuanceRouterHook from 'v2/app/pages/issuance/router'

jest.mock('assets/icons/navigation/invest.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/account.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/issuance.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/authorizer.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('v2/app/components/Sidebar/components/SidebarLink', () => ({
  SidebarLink: jest.fn(() => null)
}))

describe('Sidebar', () => {
  beforeEach(() => {
    jest.spyOn(useAuthorizerRouterHook, 'useAuthorizerRouter').mockReturnValue({
      paths: useAuthorizerRouterHook.AuthorizerRoute
    } as any)
    jest
      .spyOn(useAccountsRouterHook, 'useAccountsRouter')
      .mockReturnValue({ paths: useAccountsRouterHook.AccountsRoute } as any)
    jest
      .spyOn(useInvestRouterHook, 'useInvestRouter')
      .mockReturnValue({ paths: useInvestRouterHook.InvestRoute } as any)
    jest
      .spyOn(useIssuanceRouterHook, 'useIssuanceRouter')
      .mockReturnValue({ paths: useIssuanceRouterHook.IssuanceRoute } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)
    render(<Sidebar />)
  })

  it('renders SidebarLink correctly', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)
    render(<Sidebar />)

    expect(SidebarLink).toHaveBeenCalledTimes(2)
    expect(SidebarLink).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Accounts',
        link: useAccountsRouterHook.AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLink).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Invest',
        link: useInvestRouterHook.InvestRoute.list,
        icon: InvestIcon
      },
      {}
    )
  })

  it('renders SidebarLink correctly if user is issuer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(true)
    render(<Sidebar />)

    expect(SidebarLink).toHaveBeenCalledTimes(3)
    expect(SidebarLink).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Accounts',
        link: useAccountsRouterHook.AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLink).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Invest',
        link: useInvestRouterHook.InvestRoute.list,
        icon: InvestIcon
      },
      {}
    )
    expect(SidebarLink).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Issuance',
        link: useIssuanceRouterHook.IssuanceRoute.list,
        icon: IssuanceIcon
      },
      {}
    )
  })

  it('renders SidebarLink correctly if user is authorizer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(true)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)

    render(<Sidebar />)

    expect(SidebarLink).toHaveBeenCalledTimes(3)
    expect(SidebarLink).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Accounts',
        link: useAccountsRouterHook.AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLink).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Invest',
        link: useInvestRouterHook.InvestRoute.list,
        icon: InvestIcon
      },
      {}
    )
    expect(SidebarLink).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Authorizer',
        link: useAuthorizerRouterHook.AuthorizerRoute.landing,
        icon: AuthorizerIcon
      },
      {}
    )
  })
})
