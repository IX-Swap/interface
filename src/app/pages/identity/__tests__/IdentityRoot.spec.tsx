import React from 'react'
import { render, cleanup } from 'test-utils'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { IdentityRoot } from 'app/pages/identity/IdentityRoot'

jest.mock('app/pages/identity/router')

const useIdentitiesRouterMock = useIdentitiesRouter as jest.Mock<
  Partial<ReturnType<typeof useIdentitiesRouter>>
>

describe('IdentityRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders routes from hook', () => {
    const renderRoutes = jest.fn(() => <div />)
    useIdentitiesRouterMock.mockReturnValueOnce({
      renderRoutes
    })

    render(<IdentityRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
