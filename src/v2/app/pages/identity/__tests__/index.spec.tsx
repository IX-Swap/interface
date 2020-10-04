/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { Identity } from 'v2/app/pages/identity/index'

jest.mock('v2/app/pages/identity/router')

const useIdentitiesRouterMock = useIdentitiesRouter as jest.Mock<
  Partial<ReturnType<typeof useIdentitiesRouter>>
>

describe('Identity', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders routes from hook', () => {
    const renderRoutes = jest.fn(() => <div />)
    useIdentitiesRouterMock.mockReturnValueOnce({
      renderRoutes
    })

    render(<Identity />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
