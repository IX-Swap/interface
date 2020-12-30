import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSORoot } from 'app/pages/invest/pages/DSORoot'
import { useDSORouter } from 'app/pages/invest/routers/dsoRouter'

jest.mock('app/pages/invest/routers/dsoRouter')

const useDSORouterMock = useDSORouter as jest.Mock<
  Partial<ReturnType<typeof useDSORouter>>
>

describe('DSORoot', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useDSORouterMock.mockReturnValueOnce({ renderRoutes })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSORoot />)
  })

  it('renders routes from hook', () => {
    render(<DSORoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
