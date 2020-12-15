import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'
import {
  useInvestListRouter,
  InvestListRoute
} from 'app/pages/invest/routers/investLandingRouter'

jest.mock('app/pages/invest/routers/investLandingRouter')

const useInvestListRouterMock = useInvestListRouter as jest.Mock<
  Partial<ReturnType<typeof useInvestListRouter>>
>

describe('InvestLanding', () => {
  const renderRoutes = jest.fn(() => <div />)

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useInvestListRouterMock.mockReturnValueOnce({
      renderRoutes,
      current: { path: InvestListRoute.offerings },
      paths: InvestListRoute
    } as any)
    render(<InvestLanding />)
  })

  it('renders routes correctly with Listings tab active if current path match offerings', () => {
    useInvestListRouterMock.mockReturnValueOnce({
      renderRoutes,
      current: { path: InvestListRoute.offerings },
      paths: InvestListRoute
    } as any)
    const { getByTestId } = render(<InvestLanding />)

    const tabs = getByTestId('invest-tabs')
    const listingsTab = getByTestId('listings')
    const commitmentsTab = getByTestId('commitments')

    expect(tabs).toBeTruthy()
    expect(listingsTab).toBeTruthy()
    expect(commitmentsTab).toBeTruthy()
    expect(listingsTab).toHaveClass('Mui-selected')
  })

  it('renders routes correctly with Listings tab active if current path does not match offerings', () => {
    useInvestListRouterMock.mockReturnValueOnce({
      renderRoutes,
      current: { path: InvestListRoute.commitments },
      paths: InvestListRoute
    } as any)
    const { getByTestId } = render(<InvestLanding />)

    const tabs = getByTestId('invest-tabs')
    const listingsTab = getByTestId('listings')
    const commitmentsTab = getByTestId('commitments')

    expect(tabs).toBeTruthy()
    expect(listingsTab).toBeTruthy()
    expect(commitmentsTab).toBeTruthy()
    expect(commitmentsTab).toHaveClass('Mui-selected')
  })
})
