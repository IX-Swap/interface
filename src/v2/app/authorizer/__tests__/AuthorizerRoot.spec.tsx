/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerRoot } from 'v2/app/authorizer/AuthorizerRoot'
import { useAuthorizerRouter } from 'v2/app/authorizer/router'

jest.mock('v2/app/authorizer/router')

const useAuthorizerRouterMock = useAuthorizerRouter as jest.Mock<
  Partial<ReturnType<typeof useAuthorizerRouter>>
>

describe('AuthorizerRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders routes from hook', () => {
    const renderRoutes = jest.fn(() => <div />)
    useAuthorizerRouterMock.mockReturnValueOnce({
      renderRoutes
    })

    render(<AuthorizerRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
