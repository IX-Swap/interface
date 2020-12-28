import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLink } from 'app/pages/invest/components/InvestLink'
import * as dsoRouter from 'app/pages/invest/routers/dsoRouter'
import { dso } from '__fixtures__/authorizer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children }) => children)
}))

jest.mock('app/pages/invest/routers/dsoRouter')

jest.spyOn(useDSOByIdHook, 'useDSOById').mockImplementation(() => ({
  ...generateQueryResult({
    data: dso
  })
}))

jest.spyOn(dsoRouter, 'useDSORouter').mockImplementation(
  () =>
    ({
      params: {
        dsoId: dso._id,
        issuerId: dso.user
      },
      paths: dsoRouter.DSORoute
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
        to: dsoRouter.DSORoute.makeInvestment,
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
