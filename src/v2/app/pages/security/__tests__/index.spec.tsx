/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { SecurityRoot } from 'v2/app/pages/security/SecurityRoot'
import { useSecurityRouter } from 'v2/app/pages/security/router'

jest.mock('v2/app/pages/security/router')

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
