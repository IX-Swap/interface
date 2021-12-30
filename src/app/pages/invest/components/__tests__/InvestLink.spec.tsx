import React from 'react'
import { render } from 'test-utils'
import { InvestLink } from 'app/pages/invest/components/InvestLink'
import { dso } from '__fixtures__/authorizer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useAuthHook from 'hooks/auth/useAuth'
import { user } from '__fixtures__/user'
import { generatePath, Route } from 'react-router-dom'
import { history } from 'config/history'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children }) => children)
}))

jest.spyOn(useDSOByIdHook, 'useDSOById').mockImplementation(() => ({
  ...generateQueryResult({
    data: dso
  })
}))

describe('InvestLink', () => {
  beforeEach(() => {
    history.push(
      generatePath(InvestRoute.view, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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

    render(
      <Route path={InvestRoute.view}>
        <InvestLink />
      </Route>
    )

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        to: InvestRoute.makeInvestment,
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
