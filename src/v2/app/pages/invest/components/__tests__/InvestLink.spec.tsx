/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLink } from 'v2/app/pages/invest/components/InvestLink'
import * as offeringRouter from 'v2/app/pages/invest/routers/offeringsRouter'
import { dso } from '__fixtures__/authorizer'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useAuthHook from 'v2/hooks/auth/useAuth'
import { user } from '__fixtures__/user'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children }) => children)
}))

jest.mock('v2/app/pages/invest/routers/offeringsRouter')

jest.spyOn(useDSOByIdHook, 'useDSOById').mockImplementation(() => ({
  ...generateQueryResult({
    data: dso
  })
}))

jest.spyOn(offeringRouter, 'useOfferingsRouter').mockImplementation(
  () =>
    ({
      params: {
        dsoId: dso._id,
        issuerId: dso.user
      },
      paths: offeringRouter.OfferingRoute
    } as any)
)

describe('InvestLink', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestLink />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<InvestLink />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: offeringRouter.OfferingRoute.makeInvestment,
        params: { dsoId: dso._id, issuerId: dso.user }
      }),
      {}
    )
  })

  it('renders AppRouterLink disabled if issuer is user', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockImplementation(() => ({
      user: { ...user, _id: dso.user },
      isAuthenticated: true
    }))

    const { getByText } = render(<InvestLink />)

    expect(getByText(/invest/i)).toBeInstanceOf(HTMLSpanElement)
  })

  it('renders AppRouterLink disabled if dso does not have subscriptionDocument', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockImplementation(() => ({
      ...generateQueryResult({
        data: { ...dso, subscriptionDocument: undefined }
      })
    }))

    const { getByText } = render(<InvestLink />)

    expect(getByText(/invest/i)).toBeInstanceOf(HTMLSpanElement)
  })
})
