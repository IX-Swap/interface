import React from 'react'
import { render, cleanup } from 'test-utils'
import { SidebarContainer } from 'app/components/SidebarContainer/SidebarContainer'
import { SidebarLinkContainer } from 'app/components/SidebarContainer/components/SidebarLinkContainer'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'
import * as acl from 'helpers/acl'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { InvestRoute } from 'app/pages/invest/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { HomeRoute } from 'app/pages/home/router/config'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { OTCMarketRoute } from 'app/pages/exchange/market/router/config'
import { ReactComponent as OTCMarketIcon } from 'assets/icons/navigation/otc-market.svg'

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
        link: HomeRoute.landing,
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
        link: HomeRoute.landing,
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
        label: 'OTC Market',
        link: OTCMarketRoute.landing,
        icon: OTCMarketIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      5,
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
        link: HomeRoute.landing,
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
        label: 'OTC Market',
        link: OTCMarketRoute.landing,
        icon: OTCMarketIcon
      },
      {}
    )
    expect(SidebarLinkContainer).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Authorizer',
        link: AuthorizerRoute.landing,
        icon: AuthorizerIcon
      },
      {}
    )
  })
})
