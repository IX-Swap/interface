import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentFormCancelButton,
  CommitmentFormCancelButtonProps
} from 'v2/app/pages/invest/components/CommitmentFormCancelButton'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import {
  useOfferingsRouter,
  OfferingRoute
} from 'v2/app/pages/invest/routers/offeringsRouter'
import { dso } from '__fixtures__/authorizer'

jest.mock('v2/app/pages/invest/routers/offeringsRouter')

const useOfferingsRouterMock = useOfferingsRouter as jest.Mock<
  Partial<ReturnType<typeof useOfferingsRouter>>
>
jest.mock('v2/components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('CommitmentFormCancelButton', () => {
  const props: CommitmentFormCancelButtonProps = {}
  beforeEach(() => {
    useOfferingsRouterMock.mockReturnValue({
      paths: OfferingRoute,
      params: { dsoId: dso._id }
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentFormCancelButton {...props} />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(<CommitmentFormCancelButton {...props} />)

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        to: OfferingRoute.view,
        params: { dsoId: dso._id }
      }),
      {}
    )
  })
})
