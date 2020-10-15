/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLanding } from 'v2/app/pages/invest/pages/InvestLanding'
import {
  useInvestListRouter,
  InvestListRoute
} from 'v2/app/pages/invest/routers/investLandingRouter'

jest.mock('v2/app/pages/invest/routers/investLandingRouter')

const useInvestListRouterMock = useInvestListRouter as jest.Mock<
  Partial<ReturnType<typeof useInvestListRouter>>
>

describe('InvestLanding', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useInvestListRouterMock.mockReturnValueOnce({
      renderRoutes,
      current: { path: InvestListRoute.offerings },
      paths: { offerings: InvestListRoute.offerings }
    } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestLanding />)
  })

  it('renders routes from hook', () => {
    render(<InvestLanding />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
