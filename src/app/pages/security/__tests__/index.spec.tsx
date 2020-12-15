import React from 'react'
import { render, cleanup } from 'test-utils'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'
import { useSecurityRouter } from 'app/pages/security/router'

jest.mock('app/pages/security/router')

const useSecurityRouterMock = useSecurityRouter as jest.Mock<
  Partial<ReturnType<typeof useSecurityRouter>>
>

describe('SecurityRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders routes from hook', () => {
    const renderRoutes = jest.fn(() => <div />)
    useSecurityRouterMock.mockReturnValueOnce({ renderRoutes })

    render(<SecurityRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
