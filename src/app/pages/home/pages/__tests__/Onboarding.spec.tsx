import { Onboarding } from 'app/pages/home/pages/Onboarding'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { user } from '__fixtures__/user'
import { TopIssuers } from 'app/pages/home/components/TopIssuers'
import { TopCorporates } from 'app/pages/home/components/TopCorporates'
import { News } from 'app/pages/home/components/News/News'
import { BannersCarousel } from 'app/pages/invest/components/BannersCarousel'
import { AtlasOneReports } from 'app/pages/home/components/AtlasOneReports/AtlasOneReports'

jest.mock('app/pages/home/components/News/News', () => ({
  News: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/AtlasOneReports/AtlasOneReports', () => ({
  AtlasOneReports: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/TopIssuers', () => ({
  TopIssuers: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/TopCorporates', () => ({
  TopCorporates: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/BannersCarousel', () => ({
  BannersCarousel: jest.fn(() => null)
}))

describe('Onboarding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    render(<Onboarding />)
  })

  it('renders components correctly', () => {
    render(<Onboarding />)

    expect(AtlasOneReports).toHaveBeenCalled()
    expect(TopIssuers).toHaveBeenCalled()
    expect(TopCorporates).toHaveBeenCalled()
    expect(BannersCarousel).toHaveBeenCalled()
    expect(News).toHaveBeenCalled()
  })

  it('renders correct user name', () => {
    const objResponse = {
      user: user
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { getByText } = render(<Onboarding />)

    expect(getByText(`Welcome, ${user.name}`)).toBeTruthy()
  })
})
