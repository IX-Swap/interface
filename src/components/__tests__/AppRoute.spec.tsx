import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useAuthHook from 'hooks/auth/useAuth'
import { AppRoute, AppRouteProps } from 'components/AppRoute'
import { user } from '__fixtures__/user'

describe('AppRoute', () => {
  const props: AppRouteProps = {
    route: {
      label: 'Test label',
      path: 'test-path',
      component: <div data-testid='component' />
    },
    params: {},
    pushCrumb: jest.fn()
  } as any

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AppRoute {...props} />)
  })

  it('renders nothing if route.component is undefined ', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })
    const { container } = render(
      <AppRoute {...props} route={{ ...props.route, component: undefined }} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
