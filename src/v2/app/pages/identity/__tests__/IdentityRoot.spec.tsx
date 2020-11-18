import React from 'react'
import { render, cleanup } from 'test-utils'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { IdentityRoot } from 'v2/app/pages/identity/IdentityRoot'

jest.mock('v2/app/pages/identity/router')

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
