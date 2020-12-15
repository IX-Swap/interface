import React from 'react'
import { render, cleanup } from 'test-utils'
import { OfferingsList } from 'app/pages/invest/pages/OfferingsList'
import { DSOList } from 'app/components/DSO/components/DSOList'
import { OfferingRoute } from 'app/pages/invest/routers/offeringsRouter'

jest.mock('app/components/DSO/components/DSOList', () => ({
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
        viewURL: OfferingRoute.view
      },
      {}
    )
  })
})
