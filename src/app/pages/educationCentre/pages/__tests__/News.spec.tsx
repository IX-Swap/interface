import React from 'react'
import { render, cleanup } from 'test-utils'
import { TopIssuers } from 'app/pages/educationCentre/components/TopIssuers'
import { TopCorporates } from 'app/pages/educationCentre/components/TopCorporates'
import { News as NewsComponent } from 'app/pages/educationCentre/components/News/News'
import { BannersCarousel } from 'app/pages/invest/components/BannersCarousel'
import { News } from 'app/pages/educationCentre/pages/News'

jest.mock('app/pages/educationCentre/components/News/News', () => ({
  News: jest.fn(() => null)
}))

jest.mock('app/pages/educationCentre/components/TopIssuers', () => ({
  TopIssuers: jest.fn(() => null)
}))

jest.mock('app/pages/educationCentre/components/TopCorporates', () => ({
  TopCorporates: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/BannersCarousel', () => ({
  BannersCarousel: jest.fn(() => null)
}))

describe('News', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<News />)
  })

  it('renders components correctly', () => {
    render(<News />)

    expect(TopIssuers).toHaveBeenCalled()
    expect(TopCorporates).toHaveBeenCalled()
    expect(BannersCarousel).toHaveBeenCalled()
    expect(NewsComponent).toHaveBeenCalled()
  })
})
