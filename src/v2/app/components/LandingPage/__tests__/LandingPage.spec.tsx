import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  LandingPage,
  LandingPageProps
} from 'v2/app/components/LandingPage/LandingPage'
import { LandingPageItem } from 'v2/app/components/LandingPage/LandingPageItem'

jest.mock('v2/app/components/LandingPage/LandingPageItem', () => ({
  LandingPageItem: jest.fn(() => null)
}))

describe('LandingPage', () => {
  const props: LandingPageProps = {
    links: [
      { label: 'Assets', path: '/assets' },
      { label: 'Asset Balance', path: '/balance' }
    ],
    label: 'Account',
    path: '/account'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<LandingPage {...props} />)
  })

  it('renders LandingPageItem with correct props for each link', () => {
    render(<LandingPage {...props} />)

    expect(LandingPageItem).toHaveBeenCalledTimes(props.links.length)
    props.links.forEach((link, i) => {
      expect(LandingPageItem).toHaveBeenNthCalledWith(i + 1, { link: link }, {})
    })
  })
})
