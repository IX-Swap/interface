import { renderHook } from '@testing-library/react-hooks'
import { useAppNavigationLinks } from 'app/components/Header/hooks/useAppNavigationLinks'
import {
  accountsLandingLinks,
  AccountsRoute
} from 'app/pages/accounts/router/config'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { AppRoute } from 'app/router/config'
import {
  authorizerLandingLinks,
  AuthorizerRoute
} from 'app/pages/authorizer/router/config'
import { educationCentreLinks } from 'app/pages/educationCentre/router/config'
import { FundsManagementRoute } from 'app/pages/fundsManagement/router/config'
import { investLandingLinks, InvestRoute } from 'app/pages/invest/router/config'
import * as useIsIssuer from 'helpers/acl'
import * as useIsAuthorizer from 'helpers/acl'
import * as useIsFundManager from 'helpers/acl'
import { ReactComponent as InvestIcon } from 'assets/icons/navigation/invest.svg'
import { ReactComponent as AccountsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as IssuanceIcon } from 'assets/icons/navigation/issuance.svg'
import { ReactComponent as AuthorizerIcon } from 'assets/icons/navigation/authorizer.svg'

describe('useAppNavigationLinks', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('return array of links with correct length and values by default', () => {
    const {
      result: { current }
    } = renderHook(() => useAppNavigationLinks())

    expect(current.links.length).toEqual(3)
    expect(current.links[0]).toEqual({
      label: 'Accounts',
      link: AccountsRoute.landing,
      icon: AccountsIcon
    })
    expect(current.links[1]).toEqual({
      label: 'Invest',
      link: InvestRoute.landing,
      icon: InvestIcon
    })
    expect(current.links[2]).toEqual({
      label: 'Education Centre',
      link: AppRoute.educationCentre
    })
  })

  it('return array of links with correct length and values when isFundManager is true', () => {
    jest
      .spyOn(useIsFundManager, 'useIsFundManager')
      .mockImplementation(() => true)

    const {
      result: { current }
    } = renderHook(() => useAppNavigationLinks())

    expect(current.links.length).toEqual(4)
    expect(current.links[0]).toEqual({
      label: 'Accounts',
      link: AccountsRoute.landing,
      icon: AccountsIcon
    })
    expect(current.links[1]).toEqual({
      label: 'Invest',
      link: InvestRoute.landing,
      icon: InvestIcon
    })
    expect(current.links[2]).toEqual({
      label: 'Funds Management',
      link: FundsManagementRoute.dashboard
    })
    expect(current.links[3]).toEqual({
      label: 'Education Centre',
      link: AppRoute.educationCentre
    })
  })

  it('return array of links with correct length and values when isIssuer is true', () => {
    jest.spyOn(useIsIssuer, 'useIsIssuer').mockImplementation(() => true)

    const {
      result: { current }
    } = renderHook(() => useAppNavigationLinks())

    expect(current.links.length).toEqual(5)
    expect(current.links[0]).toEqual({
      label: 'Accounts',
      link: AccountsRoute.landing,
      icon: AccountsIcon
    })
    expect(current.links[1]).toEqual({
      label: 'Invest',
      link: InvestRoute.landing,
      icon: InvestIcon
    })
    expect(current.links[2]).toEqual({
      label: 'Funds Management',
      link: FundsManagementRoute.dashboard
    })
    expect(current.links[3]).toEqual({
      label: 'Issuance',
      link: IssuanceRoute.dashboard,
      icon: IssuanceIcon
    })
    expect(current.links[4]).toEqual({
      label: 'Education Centre',
      link: AppRoute.educationCentre
    })
  })

  it('return array of links with correct length and values when isAuthorizer is true', () => {
    jest
      .spyOn(useIsAuthorizer, 'useIsAuthorizer')
      .mockImplementation(() => true)

    const {
      result: { current }
    } = renderHook(() => useAppNavigationLinks())

    expect(current.links.length).toEqual(6)
    expect(current.links[0]).toEqual({
      label: 'Accounts',
      link: AccountsRoute.landing,
      icon: AccountsIcon
    })
    expect(current.links[1]).toEqual({
      label: 'Invest',
      link: InvestRoute.landing,
      icon: InvestIcon
    })
    expect(current.links[2]).toEqual({
      label: 'Funds Management',
      link: FundsManagementRoute.dashboard
    })
    expect(current.links[3]).toEqual({
      label: 'Issuance',
      link: IssuanceRoute.dashboard,
      icon: IssuanceIcon
    })
    expect(current.links[4]).toEqual({
      label: 'Education Centre',
      link: AppRoute.educationCentre
    })
    expect(current.links[5]).toEqual({
      label: 'Authorizer',
      link: AuthorizerRoute.landing,
      icon: AuthorizerIcon
    })
  })

  it('return isDropdownLink function which returns correct values', () => {
    const {
      result: { current }
    } = renderHook(() => useAppNavigationLinks())

    expect(current.isDropdownLink('Accounts')).toEqual(true)
    expect(current.isDropdownLink('Authorizer')).toEqual(true)
    expect(current.isDropdownLink('Invest')).toEqual(true)
    expect(current.isDropdownLink('Issuance')).toEqual(true)
    expect(current.isDropdownLink('Education Centre')).toEqual(true)
    expect(current.isDropdownLink('Funds Management')).toEqual(false)
  })

  it('return dropdownLinksItems function which returns correct values', () => {
    const {
      result: { current }
    } = renderHook(() => useAppNavigationLinks())

    expect(current.dropdownLinksItems('Education Centre')).toEqual(
      educationCentreLinks
    )
    expect(current.dropdownLinksItems('Authorizer')).toEqual([
      {
        label: 'Dashboard',
        path: AuthorizerRoute.landing
      },
      ...authorizerLandingLinks
    ])
    expect(current.dropdownLinksItems('Accounts')).toEqual(accountsLandingLinks)
    expect(current.dropdownLinksItems('Issuance')).toEqual([
      {
        label: 'Overview',
        path: IssuanceRoute.insight
      },
      { label: 'Create New DSO', path: IssuanceRoute.create },
      { label: 'View DSO Listings', path: IssuanceRoute.list },
      { label: 'Create Exchange Listings', path: IssuanceRoute.createListing },
      { label: 'View Exchange Listings', path: IssuanceRoute.myListings },
      { label: 'Financial Reports', path: IssuanceRoute.financialReports }
    ])
    expect(current.dropdownLinksItems('Invest')).toEqual(investLandingLinks)
    expect(current.dropdownLinksItems('')).toEqual([])
  })
})
