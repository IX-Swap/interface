import React from 'react'
import { render, cleanup } from 'test-utils'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { SidebarLinkContainer } from 'app/components/SidebarContainer/components/SidebarLinkContainer'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import * as acl from 'helpers/acl'
import * as useAuthorizerRouterHook from 'app/pages/authorizer/router'
import * as useAccountsRouterHook from 'app/pages/accounts/router/config'
import * as useInvestRouterHook from 'app/pages/invest/routers/router'
import * as useIssuanceRouterHook from 'app/pages/issuance/router'

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
jest.mock(
  'app/components/SidebarContainer/components/SidebarLinkContainer',
  () => ({
    SidebarLinkContainer: jest.fn(() => null)
  })
)

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
    render(<SidebarContainer />)
  })

  it('renders SidebarLink correctly', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)
    render(<SidebarContainer />)

    expect(SidebarLinkContainer).toHaveBeenCalledTimes(2)
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Accounts',
        link: useAccountsRouterHook.AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Invest',
        link: useInvestRouterHook.InvestRoute.landing,
        icon: InvestIcon
      },
      {}
    )
  })

  it('renders SidebarLink correctly if user is issuer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(true)
    render(<SidebarContainer />)

    expect(SidebarLinkContainer).toHaveBeenCalledTimes(3)
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Accounts',
        link: useAccountsRouterHook.AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Invest',
        link: useInvestRouterHook.InvestRoute.landing,
        icon: InvestIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Issuance',
        link: useIssuanceRouterHook.IssuanceRoute.insight,
        icon: IssuanceIcon
      },
      {}
    )
  })

  it('renders SidebarLink correctly if user is authorizer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(true)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)

    render(<SidebarContainer />)

    expect(SidebarLinkContainer).toHaveBeenCalledTimes(3)
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Accounts',
        link: useAccountsRouterHook.AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Invest',
        link: useInvestRouterHook.InvestRoute.landing,
        icon: InvestIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
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
