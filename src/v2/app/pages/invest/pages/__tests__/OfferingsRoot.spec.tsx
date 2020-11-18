import React from 'react'
import { render, cleanup } from 'test-utils'
import { OfferingsRoot } from 'v2/app/pages/invest/pages/OfferingsRoot'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'

jest.mock('v2/app/pages/invest/routers/offeringsRouter')

const useOfferingsRouterMock = useOfferingsRouter as jest.Mock<
  Partial<ReturnType<typeof useOfferingsRouter>>
>

describe('OfferingsRoot', () => {
  const renderRoutes = jest.fn(() => <div />)
  beforeEach(() => {
    useOfferingsRouterMock.mockReturnValueOnce({ renderRoutes })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<OfferingsRoot />)
  })

  it('renders routes from hook', () => {
    render(<OfferingsRoot />)

    expect(renderRoutes).toHaveBeenCalledTimes(1)
  })
})
