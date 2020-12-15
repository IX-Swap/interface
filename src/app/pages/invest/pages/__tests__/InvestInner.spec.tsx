import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestInner } from 'app/pages/invest/pages/InvestInner'
import { useInvestListRouter } from 'app/pages/invest/routers/investLandingRouter'

jest.mock('app/pages/invest/routers/investLandingRouter')

const useInvestListRouterMock = useInvestListRouter as jest.Mock<
  Partial<ReturnType<typeof useInvestListRouter>>
>

describe('InvestInner', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useInvestListRouterMock.mockReturnValueOnce({
      renderRoutes
    })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestInner />)
  })

  it('renders routes from hook', () => {
    render(<InvestInner />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
