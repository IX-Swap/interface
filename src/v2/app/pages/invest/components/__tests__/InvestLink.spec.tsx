/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLink } from 'v2/app/pages/invest/components/InvestLink'
import {
  useOfferingsRouter,
  OfferingRoute
} from 'v2/app/pages/invest/routers/offeringsRouter'
import { dso } from '__fixtures__/authorizer'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/invest/routers/offeringsRouter')

const useOfferingsRouterMock = useOfferingsRouter as jest.Mock<
  Partial<ReturnType<typeof useOfferingsRouter>>
>

describe('InvestLink', () => {
  beforeEach(() => {
    useOfferingsRouterMock.mockReturnValueOnce({
      paths: OfferingRoute,
      params: { dsoId: dso._id }
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestLink />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<InvestLink />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        to: OfferingRoute.makeInvestment,
        params: { dsoId: dso._id }
      }),
      {}
    )
  })
})
