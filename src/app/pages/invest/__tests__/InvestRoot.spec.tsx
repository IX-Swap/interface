import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestRoot } from 'app/pages/invest/InvestRoot'
import { useInvestRouter } from 'app/pages/invest/routers/router'

jest.mock('app/pages/invest/routers/router')

const useInvestRouterMock = useInvestRouter as jest.Mock<
  Partial<ReturnType<typeof useInvestRouter>>
>

describe('InvestRoot', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useInvestRouterMock.mockReturnValueOnce({ renderRoutes })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestRoot />)
  })

  it('renders routes from hook', () => {
    render(<InvestRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
