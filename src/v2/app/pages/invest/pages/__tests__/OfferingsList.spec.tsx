/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { OfferingsList } from 'v2/app/pages/invest/pages/OfferingsList'
import { DSOList } from 'v2/app/components/DSO/components/DSOList'
import { OfferingRoute } from 'v2/app/pages/invest/routers/offeringsRouter'

jest.mock('v2/app/components/DSO/components/DSOList', () => ({
  DSOList: jest.fn(() => null)
}))

describe('OfferingsList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<OfferingsList />)
  })

  it('renders DSOList with correct props', () => {
    render(<OfferingsList />)

    expect(DSOList).toHaveBeenCalledWith(
      {
        user: null,
        filter: {
          status: 'Approved'
        },
        viewURL: OfferingRoute.view
      },
      {}
    )
  })
})
