import React from 'react'
import { render, cleanup } from 'test-utils'
import { OfferingsList } from 'app/pages/invest/pages/OfferingsList'
import { DSOTopOffers } from 'app/components/DSO/components/DSOTopOffers'

jest.mock('app/components/DSO/components/DSOTopOffers', () => ({
  DSOTopOffers: jest.fn(() => null)
}))

describe('OfferingsList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<OfferingsList />)
  })

  it('renders DSOTopOffers correctly', () => {
    render(<OfferingsList />)

    expect(DSOTopOffers).toHaveBeenCalled()
  })
})
