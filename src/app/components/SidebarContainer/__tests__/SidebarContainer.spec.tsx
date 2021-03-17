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
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { InvestRoute } from 'app/pages/invest/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import * as useHomeRouterHook from 'app/pages/home/router'

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
      .spyOn(useHomeRouterHook, 'useHomeRouter')
      .mockReturnValue({ paths: useHomeRouterHook.HomeRoute } as any)
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

    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Home',
        link: useHomeRouterHook.HomeRoute.landing,
        icon: expect.anything()
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Accounts',
        link: AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Invest',
        link: InvestRoute.landing,
        icon: InvestIcon
      },
      {}
    )
  })

  it('renders SidebarLink correctly if user is issuer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(true)
    render(<SidebarContainer />)

    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Home',
        link: useHomeRouterHook.HomeRoute.landing,
        icon: expect.anything()
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Accounts',
        link: AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Invest',
        link: InvestRoute.landing,
        icon: InvestIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Issuance',
        link: IssuanceRoute.insight,
        icon: IssuanceIcon
      },
      {}
    )
  })

  it('renders SidebarLink correctly if user is authorizer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(true)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)

    render(<SidebarContainer />)

    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Home',
        link: useHomeRouterHook.HomeRoute.landing,
        icon: expect.anything()
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      2,
      {
        label: 'Accounts',
        link: AccountsRoute.landing,
        icon: AccountsIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Invest',
        link: InvestRoute.landing,
        icon: InvestIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      4,
      {
        label: 'Authorizer',
        link: useAuthorizerRouterHook.AuthorizerRoute.landing,
        icon: AuthorizerIcon
      },
      {}
    )
  })
})
