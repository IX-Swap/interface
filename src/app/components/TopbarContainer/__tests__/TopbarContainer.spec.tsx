import React from 'react'
import { render, cleanup } from 'test-utils'
import * as acl from 'helpers/acl'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { InvestRoute } from 'app/pages/invest/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { HomeRoute } from 'app/pages/home/router/config'
import { AuthorizerRoute } from 'app/pages/authorizer/router/config'
import { TopbarContainer } from 'app/components/TopbarContainer/TopbarContainer'
import { TopbarLinkContainer } from 'app/components/TopbarContainer/components/TopbarLinkContainer'

jest.mock('assets/icons/navigation/invest.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/account.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/issuance.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/otc-market.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock('assets/icons/navigation/authorizer.svg', () => ({
  ReactComponent: jest.fn(() => null)
}))
jest.mock(
  'app/components/TopbarContainer/components/TopbarLinkContainer',
  () => ({
    TopbarLinkContainer: jest.fn(() => null)
  })
)

describe('Topbar', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)
    render(<TopbarContainer />)
  })

  it('renders TopbarLink correctly', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)
    render(<TopbarContainer />)

    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Home',
        link: HomeRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Accounts',
        link: AccountsRoute.landing,
        disabled: true
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Invest',
        link: InvestRoute.landing
      }),
      {}
    )
  })

  it('renders TopbarLink correctly if user is issuer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(false)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(true)
    render(<TopbarContainer />)

    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Home',
        link: HomeRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Accounts',
        link: AccountsRoute.landing,
        disabled: true
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Invest',
        link: InvestRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Issuance',
        link: IssuanceRoute.list
      }),
      {}
    )
  })

  it('renders TopbarLink correctly if user is authorizer', () => {
    jest.spyOn(acl, 'useIsAuthorizer').mockReturnValue(true)
    jest.spyOn(acl, 'useIsIssuer').mockReturnValue(false)

    render(<TopbarContainer />)

    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Home',
        link: HomeRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Accounts',
        link: AccountsRoute.landing,
        disabled: true
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Invest',
        link: InvestRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Authorizer',
        link: AuthorizerRoute.landing,
        disabled: true
      }),
      {}
    )
  })

  it('renders TopbarLink correctly if user is fund manager', () => {
    jest.spyOn(acl, 'useIsFundManager').mockReturnValue(true)

    render(<TopbarContainer />)

    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Home',
        link: HomeRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Accounts',
        link: AccountsRoute.landing,
        disabled: true
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        label: 'Invest',
        link: InvestRoute.landing
      }),
      {}
    )
    expect(TopbarLinkContainer).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        label: 'Funds Management',
        link: IssuanceRoute.insight
      }),
      {}
    )
  })
})
