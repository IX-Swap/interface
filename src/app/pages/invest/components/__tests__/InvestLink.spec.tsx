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
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue(generateQueryResult({ data: dso }))

    render(<InvestLink />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue(generateQueryResult({ data: dso, isLoading: true }))

    const { container } = render(<InvestLink />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue(generateQueryResult({ data: undefined }))

    const { container } = render(<InvestLink />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders AppRouterLink with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue(generateQueryResult({ data: dso }))

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
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      user: { ...user, _id: dso.user },
      isAuthenticated: true
    })

    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue(generateQueryResult({ data: dso }))

    const { getByText } = render(<InvestLink />)

    expect(getByText(/invest/i)).toBeInstanceOf(HTMLSpanElement)
  })

  it('renders AppRouterLink disabled if dso does not have subscriptionDocument', () => {
    jest.spyOn(useDSOByIdHook, 'useDSOById').mockReturnValue({
      ...generateQueryResult({
        data: { ...dso, subscriptionDocument: undefined }
      })
    })

    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue(generateQueryResult({ data: dso }))

    const { getByText } = render(<InvestLink />)

    expect(getByText(/invest/i)).toBeInstanceOf(HTMLSpanElement)
  })
})
