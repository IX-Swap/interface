import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import {
  AuthorizerRoute,
  useAuthorizerRouter
} from 'app/pages/authorizer/router'
import { history } from 'config/history'

jest.mock('app/pages/authorizer/router')

const useAuthorizerRouterMock = useAuthorizerRouter as jest.Mock<
  Partial<ReturnType<typeof useAuthorizerRouter>>
>

describe('AuthorizerRoot', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders routes from hook', () => {
    const renderRoutes = jest.fn(() => <div />)
    useAuthorizerRouterMock.mockImplementation(() => ({
      renderRoutes,
      paths: AuthorizerRoute,
      current: {
        label: '',
        path: ''
      }
    }))

    render(<AuthorizerRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
