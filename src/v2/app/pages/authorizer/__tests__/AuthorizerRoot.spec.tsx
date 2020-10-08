/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerRoot } from 'v2/app/pages/authorizer/AuthorizerRoot'
import {
  AuthorizerRoute,
  useAuthorizerRouter
} from 'v2/app/pages/authorizer/router'
import { history } from 'v2/history'

jest.mock('v2/app/pages/authorizer/router')

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
